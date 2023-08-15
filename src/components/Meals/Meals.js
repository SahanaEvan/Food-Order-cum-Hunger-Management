// import React ,{ Fragment } from "react"
// import MealItem from "./MealItem/MealItem"
import MealsSummary from "./MealsSummary"
import AvailableMeals from "./AvailableMeals"


 
const Meals =() =>{
    console.log('hi form meals')
    return (
        <div>
        <MealsSummary/>
        <AvailableMeals/>
        </div>
    )
}
export default Meals