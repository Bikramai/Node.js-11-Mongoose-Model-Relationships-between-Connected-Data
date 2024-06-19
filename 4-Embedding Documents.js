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
  author: authorSchema,
  required: true
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

// Update querying the document
async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = 'Bikram Phurumbo';
  course.save();
  }

// update directly in the database
async function updateAuthor(courseId) {
  const course = await Course.updateOne({ _id: courseId }, {
    $set: {
      'author.name': 'Ayusha Phurumbo'
      }
    });
  }

// Unset author.name remove this nest of property -update directly in the database
async function updateAuthor(courseId) {
  const course = await Course.updateOne({ _id: courseId }, {
    $unset: {
      'author': ''
      }
    });
  }

// createCourse('Node Course', new Author({ name: 'Bikram' }));

updateAuthor('663e68579521677116bcd3fb');
