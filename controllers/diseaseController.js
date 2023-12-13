const axios =  require("axios");
const Disease = require("../models/diseaseModel");

exports.addDisease = async (req,res)=>{
    const disease = await Disease.create({
        diseaseName: req.body.diseaseName,
        diseasetype: "Genetic Diseases",
        diseaseSubtype: "Single-Gene Disorders",
        causativeAgent: req.body.cauAgent,
        transmission: req.body.transmision,
        incubationPeriod: req.body.period,
        symptoms: (req.body.sympt.split(".,")).map(word => word.trim()),
        diagnosis: req.body.diagnosis,
        treatment: req.body.treatment,
        prevention: req.body.prevMethod
    })
    // res.status(200).json({
    //     status: "success",
    //     data : disease
    // })
    res.send("Done")
}

exports.allDisease = async (req,res)=>{
    const allDisease = await Disease.find()
    res.status(200).json({
        status: "success",
        result: allDisease.length,
        data: allDisease
    })
}

exports.allSubTypeDisease = async (req,res)=>{
  const diseases = await Disease.find({'diseasetype':req.body.diseasetype})
  const diseaseSubtypes = diseases.map(disease => disease.diseaseSubtype);
  const uniqueArr = [...new Set(diseaseSubtypes)];
  res.status(200).json({
    status: "success",
    result: uniqueArr.length,
    data: uniqueArr
  })
}

exports.getDiseaseDetail = async (req,res)=>{
  const diseases = await Disease.find({'diseaseName':req.body.diseaseName})
  res.status(200).json({
    status: "success",
    result: diseases.length,
    data: diseases
  })
}

exports.getDiseaseFromSubTypeDisease = async (req,res)=>{
  const diseases = await Disease.find({'diseaseSubtype':req.body.diseaseSubtype})
  const diseaseName = diseases.map(disease => disease.diseaseName);
  res.status(200).json({
    status: "success",
    result: diseaseName.length,
    data: diseaseName
  })
}

exports.getDiseaseFromSymtom = async(req,res)=>{
  // const diseases = await Disease.find({'symptoms':req.body.symptom})
  console.log(req.body.symptom)
  const diseases = await Disease.find({ symptoms: { $in: req.body.symptom } });
  res.status(200).json({
    status: "success",
    result: diseases.length,
    data: diseases
  })
}

exports.updateDisease = async(req,res)=>{
    console.log(req.body)
    try {
    const query = { _id: req.params.id };
    const newValues = { $set: { diseaseDiscription: req.body.decrip} };

    // Update the document in the collection
    const result = await Disease.updateOne(query, newValues);

    // Return a success response
    res.status(200).json({
      success: true,
      message: 'Document updated successfully',
      data: result,
    });
    } catch (error) {
    // Handle errors and return an error response
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error updating document',
      error: error.message,
    });
  }
}