const mongoose = require('mongoose');
const slugify = require('slugify');


const diseaseSchema = new mongoose.Schema({
    diseaseName:{
        type:String,
        required:true,
        trim:true,
    },
    diseaseDiscription:{
        type:String,
    },
    diseasetype:{
        type:String,
        required: true,
    },
    diseaseSubtype:{
        type:String,
    },
    causativeAgent: {
        type: String,
        text: true,
      },
    slug: String,
    transmission:{
        type: String
    },
    incubationPeriod:{
        type: String,
    },
    symptoms:[String],
    diagnosis:{
        type:String,
        trim:true,
    },
    treatment:{
        type:String,
        trim:true,
    },
    prevention:{
        type:String,
        trim:true,
    },
})

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
diseaseSchema.pre("save", function (next) {
    this.slug = slugify(this.diseaseName, { lower: true });
    next();
});

const Disease = mongoose.model("medicalApp", diseaseSchema);

module.exports = Disease;