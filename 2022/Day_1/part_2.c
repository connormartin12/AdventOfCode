#include <stdio.h>
#include <stdlib.h>

int main(void) {
    FILE *input_file;
    input_file = fopen("./puzzle_input.txt", "r");

    long total_calories = 0;
    long current_calories = 0;
    long first_elf = 0;
    long second_elf = 0;
    long third_elf = 0;

    char *buffer;
    size_t buffer_size = 64;
    buffer = (char *)malloc(buffer_size * sizeof(char));
    while (!feof(input_file)) {
        getline(&buffer, &buffer_size, input_file);
        if (buffer[0] == '\n') {
            if (current_calories > first_elf) {
                third_elf = second_elf;
                second_elf = first_elf;
                first_elf = current_calories;
            } else if (current_calories > second_elf) {
                third_elf = second_elf;
                second_elf = current_calories;
            } else if (current_calories > third_elf) {
                third_elf = current_calories;
            }
            current_calories = 0;
        } else {
            current_calories += atoi(buffer);
        }
    }

    total_calories = first_elf + second_elf + third_elf;
    printf("Total Calories = %ld\n", total_calories);
    return 0;
}
