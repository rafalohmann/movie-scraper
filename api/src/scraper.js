const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

const scrapeCriterion = async () => {
    const movies = [];

    try {
        console.log('Starting Criterion scraping...');
        const { data } = await axios.get('https://films.criterionchannel.com/');
        console.log('Fetched data from Criterion website.');

        const $ = cheerio.load(data);

        console.log(`
    --------------------------------------------------------------------------------------------------------------------------------------------------------------
    | No.  | Title                                                                  | Director                            | Year | Origin                         |
    --------------------------------------------------------------------------------------------------------------------------------------------------------------`);

        $('tr.criterion-channel__tr').each((index, element) => {
            const title = $(element).find('td.criterion-channel__td--title a').text().trim();
            const director = $(element).find('td.criterion-channel__td--director').text().trim();
            const year = $(element).find('td.criterion-channel__td--year').text().trim();
            const origin = $(element).find('td.criterion-channel__td--country span').first().text().trim();

            if (title && director && origin && year) {
                movies.push({ title, director, origin, year, source: 'criterion' });

                console.log(
                    `| ${String(movies.length).padEnd(4)} | ${title.padEnd(70)} | ${director.padEnd(
                        35,
                    )} | ${year.padEnd(4)} | ${origin.padEnd(30)} |`,
                );
            }
        });

        console.log(
            '---------------------------------------------------------------------------------------------------------------------------------------------------------------',
        );

        console.log(`Criterion scraping completed. Total movies found: ${movies.length}`);
    } catch (error) {
        console.error('Error scraping Criterion:', error);
    }

    return movies;
};

const scrapeMubi = async () => {
    console.log('Starting Mubi scraping...');
    const movies = [];
    const maxRetries = 3;
    const pageTimeout = 10000; // 10 seconds

    console.log(`
--------------------------------------------------------------------------------------------------------------------------------------------------------------
| No.  | Title                                                                  | Director                            | Year | Origin                         |
--------------------------------------------------------------------------------------------------------------------------------------------------------------`);

    try {
        let hasNextPage = true;
        let pageIndex = 1;

        while (hasNextPage) {
            if (pageIndex > 1) {
                console.log(
                    `--- Fetching page ${pageIndex} from Mubi --------------------------------------------------------------------------------------------------------------------------------`,
                );
            }

            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                try {
                    const browser = await puppeteer.launch({
                        headless: true,
                        args: ['--no-sandbox', '--disable-setuid-sandbox'],
                    });

                    const page = await browser.newPage();
                    await page.setUserAgent(
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                    );

                    await page.goto(`https://mubi.com/en/films?sort=title&filterShowing=true&page=${pageIndex}`, {
                        waitUntil: 'networkidle2',
                        timeout: pageTimeout,
                    });

                    // Define two selectors to wait for
                    const selector1 = 'h3';
                    const specificText = 'We can’t find any films quite like that. Try changing your selections.';

                    // Wait for either of the selectors using Promise.race
                    const result = await Promise.race([
                        page
                            .waitForSelector(selector1, { timeout: pageTimeout })
                            .then(() => ({ type: 'selector', data: 'Selector found' })),
                        page
                            .waitForFunction(
                                (text) => {
                                    const elements = document.querySelectorAll('div');
                                    for (let element of elements) {
                                        if (element.textContent.trim() === text) {
                                            return true;
                                        }
                                    }
                                    return false;
                                },
                                { timeout: pageTimeout },
                                specificText,
                            )
                            .then(() => ({ type: 'function', data: 'Function condition met' })),
                    ]);

                    if (result.type === 'function') {
                        hasNextPage = false;
                        break;
                    }

                    const content = await page.content();

                    const $ = cheerio.load(content);

                    $('h3').each((index, element) => {
                        const title = $(element).text().trim();
                        const directorAndYearDiv = $(element).next('div[data-testid="director-and-year"]');

                        if (title && directorAndYearDiv.length) {
                            const directorAndYearSpans = $(directorAndYearDiv).children('span');
                            if (directorAndYearSpans.length === 3) {
                                const [directorSpan, originSpan, yearSpan] = directorAndYearSpans;

                                const director = $(directorSpan).text().trim();
                                const origin = $(originSpan).text().trim();
                                const year = $(yearSpan).text().trim();

                                movies.push({
                                    title,
                                    director,
                                    origin,
                                    year,
                                    source: 'mubi',
                                });

                                console.log(
                                    `| ${String(movies.length).padEnd(4)} | ${title.padEnd(70)} | ${director.padEnd(
                                        35,
                                    )} | ${year.padEnd(4)} | ${origin.padEnd(30)} |`,
                                );
                            }
                        }
                    });

                    pageIndex++;

                    await browser.close();

                    break; // Exit the retry loop if successful
                } catch (error) {
                    console.error(`Attempt ${attempt} failed for page ${pageIndex}:`, error);
                    if (attempt === maxRetries) {
                        console.error('Max retries reached. Skipping this page.');
                        hasNextPage = false;
                    } else {
                        console.log('Retrying...');
                    }
                }
            }
        }

        console.log(
            '---------------------------------------------------------------------------------------------------------------------------------------------------------------',
        );

        console.log(`Mubi scraping completed. Total movies found: ${movies.length}`);

        return movies;
    } catch (error) {
        console.error('Error scraping Mubi:', error);
        return [];
    }
};

module.exports = { scrapeCriterion, scrapeMubi };
