# Day 3 Solution

## Puzzle Input

Each line of the input is a string of digits that contain the number 0-9. The string of digits is called a bank and individual digits are called batteries.

### Part 1

Find total output joltage. Total output joltage is the sum of the maximum output joltage possible from each bank.

Each bank's maximum output joltage is the largest number that can be formed from 2 individual digits in the bank where the second digit used for the number comes _after_ the first digit. For example, if the banks digits are `1115249238`, then the maximum output joltage is `98`.

#### The solution

Split all batteries from the banks into an array. Sort the array from highest to lowest. Create a string by adding together position 0 and 1 of the array, parse the int, and add it to the total output joltage.
