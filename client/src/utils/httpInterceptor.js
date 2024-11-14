export default function applyInterceptors(instance) {
    instance.interceptors.request.use(
        (config) => {
            // You can modify the config here, e.g., add authentication headers
            return config;
        },
        (err) => Promise.reject(err),
    );
}
