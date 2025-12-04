# Day 2: Gift Shop

## Part 1

Elves played on the gift shop computer and added invalid product IDs to the gift shop database.

### Invalid IDs

Invlaid IDs are any IDs that have some sequence of digits that are repeated _exactly_ twice.
Ex. `1234` is a valid ID, but `12341234` is not since 1234 is repeated twice.

### Puzzle Input

Puzzle input comes in a single line of text that contains a list of ID ranges separated by commas. For example:

```
11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124
```

11-22 is the first ID range and has exactly two invalid IDs: `11` and `22`.
