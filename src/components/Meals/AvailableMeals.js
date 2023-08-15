import classes from './AvailableMeal.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem';
import { useEffect ,useState} from 'react';
// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];

const AvailableMeals = () => {

    const[meals,setMeals]=useState([]);//use this instead of dummy meals
    const [isLoading,setisLoading]=useState(true)//initially we are loading

    //error handling state
    const [hasError,setError]=useState(null);

    useEffect(()=>{//should not use async in useeffect directly so create separate function inside
        
        const fetchMeal= async () =>{
            const response=await fetch('https://food-app-29959-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json').then();
            const responseData=await response.json();//it will be an object but we need an array like our DUMMY data
            if(!response.ok){
                throw new Error('Something went wrong')
            }
            const loadedMeals=[];
            for(const key in responseData){
                loadedMeals.push({
                    id:key,
                    name:responseData[key].name,
                    description:responseData[key].desc,
                    price:responseData[key].price,
                })
            }
            setMeals(loadedMeals);
            setisLoading(false);//now we are not loading
        }
        
        fetchMeal().then().catch((error)=>{
                setisLoading(false);
            setError(error.message);//error is by default given and has a proeprty mesage
            });
        
        // catch (error){
            
        // }//this method wont work coz fetchMeal is an async method which returns a promise but if error is caught it is rejected so we add catch on the promise itself
        
    },[])//no dependencies to run this again and again

    if(isLoading===true){
        return <section className={classes.MealsLoading}>
            <p>Loading</p>
        </section>
    }
    if(hasError){
        return <section className={classes.MealsError}>
        <p>HTTP ERROR</p>
    </section>
    }
    const mealsList = meals.map(meal => 
    <MealItem
     key={meal.id}
     id={meal.id}
      name={meal.name} 
      description={meal.description}
       price={meal.price} 
    />);
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}
export default AvailableMeals