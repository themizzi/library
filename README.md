# Library

## Features

### Create book

WHEN I create a book

THEN it is available

### Borrow book

GIVEN an available book

WHEN I borrow the book

THEN it is borrowed

### Borrow unavailable book

GIVEN a borrowed book

WHEN I try to borrow the book

THEN it fails to borrow the book

### Return book

GIVEN a borrowed book

WHEN I return the book

THEN the book is available

### Return an available book

GIVEN an available book

WHEN I return the book

THEN it fails to return the book

### Book can only be borrowed 5 times

GIVEN an available book

AND the book has been borrowed 5 times

WHEN I try to borrow the book

THEN the book is not found
