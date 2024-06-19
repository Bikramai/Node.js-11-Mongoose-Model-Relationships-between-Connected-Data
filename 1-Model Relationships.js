// Trade off between query performance vs consistency

// Using References (Normalization) -> CONSISTENCY
let author = {
    name: 'Bikram Phurumbo'
}

let course = {
    author: 'id'
}

// Using Embedded Documents (Denormalization) -> PERFORMANCE
let course1 = {
    author: {
        name: 'Bikram Phurumbo'
    }
}