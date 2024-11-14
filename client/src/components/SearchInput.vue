<template>
    <div class="input-group py-1">
        <span class="input-group-text">
            <font-awesome-icon :icon="['fas', 'search']" />
        </span>
        <input
            type="text"
            class="form-control border-0"
            placeholder="Search..."
            :value="modelValue"
            @input="handleInput"
        />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

defineOptions({
    name: 'SearchInput',
});

const props = defineProps({
    modelValue: String,
});

const emit = defineEmits(['update:modelValue']);

// Local ref for internal tracking
const internalValue = ref(props.modelValue);

// Watch for changes in `modelValue` to update the internal value
watch(
    () => props.modelValue,
    (newValue) => {
        internalValue.value = newValue;
    },
);

let debounceTimer;
const handleInput = (event) => {
    const value = event.target.value;
    internalValue.value = value;

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        // Emit the updated value after debounce delay
        emit('update:modelValue', value);
    }, 1000);
};
</script>

<style scoped>
.input-group-text {
    background-color: transparent;
    border: none;
}
</style>
