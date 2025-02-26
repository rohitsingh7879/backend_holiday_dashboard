const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: { type: String, default: null },
    icon: { type: String, default: null },
})

const fareSchema = new mongoose.Schema({
    availability: { type: String, default: null },
    flightPrice: { type: String, default: null },
    flightsPrice3rd4thPax: { type: String, default: null },
    gradeCode: { type: String, default: null },
    gradeName: { type: String, default: null },
    price: { type: String, default: null },
    price2ndPax: { type: String, default: null },
    price3rd4thPax: { type: String, default: null },
    priceSingle : {type: String, default: null},
}
);
const contentSchema = new mongoose.Schema({
    intro: { type: String, default: null }, 
    video: { type: String, default: null }  
});

const fareSetSchema = new mongoose.Schema({
    fare_set_name: { type: String, default: null },
    airport_code: { type: String, default: null },
    deal_code: { type: String, default: null },
    fares: [fareSchema]  
}
);


const itinerarySchema = new mongoose.Schema(
    {
        category: { type: String, default: null },
        port: { type: String, default: null },
        check_in_date: { type: String, default: null },
        check_out_date: { type: String, default: null },
        description : { type : String , default : null},
        day : { type : String , default : null}
    }
);

const imageSchema = new mongoose.Schema({
    name: { type: String, default: null},
    href: { type: String,default: null}
});


const accom_statsSchema = new mongoose.Schema({
    type: { type: String , default: null},
    min_occupancy: { type: Number,default: 1},
    max_occupancy: { type: Number, default: 1},
    min_size: { type: Number,default: 0},
    max_size: { type: Number, default: 0}
});
const accommodationTypeSchema = new mongoose.Schema({
    images: { type: [imageSchema], default: [] },
    name: { type: String, default: null },
    description: { type: String, default: null},
    stats: { type: String, default: null },
    grade_codes: { type: [String],default: []},
    facilities: { type: [String], default: []},
    accessible_cabin: { type: Boolean, default: false },
    accom_stats: { type : accom_statsSchema, default : {} },
    floorplans: { type : [imageSchema], default: [] }
});

const attachmentsSchema = new mongoose.Schema({
    name: { type: String, default: null },
    href: { type: String, default: null},
    thumbnail: { type: String, default: null },
})

const dining_optionsSchema = new mongoose.Schema({
    images: { type: [imageSchema], default: [] },
    attachments: { type: [attachmentsSchema],  default: []},
    name: {  type: String, default: null},
    experience: { type: String, default: null },
    food: { type: String, default: null },
    description: { type: String, default: null}
});

const deckplansSchema = new mongoose.Schema({
    images: { type: [imageSchema], default: [] },
    name: { type: String, default: null },
    description: { type: String, default: null},
});

const enrichment_typesSchema = new mongoose.Schema({
    images: { type: [imageSchema], default: [] },
    attachments: { type: [attachmentsSchema],  default: [] },
    name: { type: String, default: null },
    description: { type: String, default: null },
    types: { type: [String] ,default: [] }
});


const cruiseSchema = new mongoose.Schema({
    name: { type: String, default: null },
    ref: { type: String, default: null },
    cruise: { type: String, default: null  }
});

const holidaysSchema = new mongoose.Schema({
    name: { type: String, default: null },
    holiday_ref: { type: String, default: null },
    holiday: { type: String, default: null  }
});

const  formScehma = new mongoose.Schema({
    name : {
        type : String,
        default : null
    },
    reference : {
         type :  String,
         default : null
    },
    operator : {
        type :  String,
        default : null
    },
    ship : {
        type :  String,
        default : null
    },
    region : {
        type :  String,
        default : null
    },
    cruise_nights : {
        type :  String,
        default : null
    },
    general_type : {
        type :  String,
        default : null
    },
    general_Start : {
        type :  String,
        default : Date.now
    },
    general_end : {
        type :  String,
        default : Date.now
    },
    general_categories : {
        type: [String],
        default: []
    },
    general_range : {
        type :  String,
        default : null
    },
    cruise_image : {
        type :  String,
        default : null
    },
    sales_banner_image : {
        type : String,
        default : null
    },
    cruise_banner_image : {
        type :  String,
        default : null
    },
    mobile_cruise_banner_image : {
        type :  String,
        default : null
    },
    summary : {
        type :  String,
        default : null
    },
    sales_message : {
        type : String,
        default : null
    },
    text_banner : {
        type : String,
        default : null
    },
    overview : {
        type : String,
        default : null
    },
    whats_included : {
        type : String,
        default : null
    },
    extras : {
        type : String,
        default : null
    },
    package_cruise_value1: {
        type : String,
        default : null
    },
    package_cruise_value2: {
        type : String,
        default : null
    },
    package_cruise_value3: {
        type : String,
        default : null
    },
    package_cruise_value4: {
        type : String,
        default : null
    },
    package_cruise_value5: {
        type : String,
        default : null
    },
    package_cruise_value6: {
        type : String,
        default : null
    },
    package_cruise_value_pp_inside: {
        type : String,
        default : null
    },
    package_cruise_value_solo_inside: {
        type : String,
        default : null
    },
    fare_sets: [fareSetSchema],
    adjustment_type : {
        type : String,
        default : null
    },
    adjustment_amount : {
        type : String,
        default : null 
    },
    restrict_start_date : {
        type : String ,
        default : Date.now
    },
    restrict_end_date : {
        type : String,
        default : Date.now 
    },
    itinerary : [itinerarySchema],
    options_name : {
        type : String,
        default : null
    },
    options_amount:{
        type : String,
        default : null
    },
    options_select :{
        type : String,
        default : null
    },
    tour_title : {
        type : String,
        default : null
    },
    tour : [tourSchema],
    teaser:{
        type : String,
        default : null
    },
    introduction :{
        type : String,
        default : null
    },
    unique_feature:{
        type : String,
        default : null
    },
    gratuities : {
        type : String,
        default : null
    },
    video_url : {
        type : String,
        default : null
    },
    accommodation: { 
        type: contentSchema,
        default: {} 
    },
    dining: { 
        type: contentSchema, 
        default: {} 
    },
    enrichment : {
        type : contentSchema,
        default : {}
    },
    entertainment:{
        type : contentSchema,
        default : {}
    },
    health_and_fitness:{
        type : contentSchema,
        default : {}
    },
    kids_and_teens :{
        type : contentSchema,
        default : {}
    },
    accomodation_types : {
        type :  [accommodationTypeSchema],
        default: []
    },
    deckplans : {
        type : [deckplansSchema],
        default : []
    },
    dining_options :{
        type : [dining_optionsSchema],
        default : []
    },
    enrichment_types : {
        type : [enrichment_typesSchema],
        default : []
    },
    entertainment_types :{
        type : [enrichment_typesSchema],
        default : []
    },
    health_fitness_types :{
        type : [enrichment_typesSchema],
        default : []
    },
    useful_types : {
        type : [enrichment_typesSchema],
        default : []
    },
    cruises :{
        type : [cruiseSchema],
        default : []
    },
    holidays : {
        type : [holidaysSchema],
        default : [] 
    }

})

const formSchemaModel = mongoose.model('newPackages', formScehma);

module.exports = formSchemaModel;


