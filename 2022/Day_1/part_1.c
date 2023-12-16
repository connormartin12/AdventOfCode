#include <stdio.h>
#include <stdlib.h>

int main(void) {
    FILE *input_file;
    input_file = fopen("./calibration_input.txt", "r");

    long total_calories = 0;
    long current_calories = 0;

    char *buffer;
    size_t buffer_size = 64;
    buffer = (char *)malloc(buffer_size * sizeof(char));
    while (!feof(input_file)) {
        getline(&buffer, &buffer_size, input_file);
        if (buffer[0] == '\n') {
            if (current_calories > total_calories)
                total_calories = current_calories;

            current_calories = 0;
        } else {
            current_calories += atoi(buffer);
        }
    }

    printf("Most Calories = %ld\n", total_calories);
    return 0;
}
