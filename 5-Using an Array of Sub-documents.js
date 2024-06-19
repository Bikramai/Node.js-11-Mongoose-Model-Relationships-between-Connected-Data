// How to change an array of sub-documents?

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function addAuthor(courseId, author) {
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

async function removeAuthor(courseId, authorId) {
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.deleteOne();
    course.save();
}

// createCourse('Node Course', [
//     new Author({ name: 'Bikram' }),
//     new Author({ name: 'Mon' }),
// ]);


// addAuthor('663e7c4f9bf8cc98436634fb', new Author({name:'Mangnewa'}))

removeAuthor('663e7c4f9bf8cc98436634fb', '663f6e4cc2a60bbcd88e75c1')

