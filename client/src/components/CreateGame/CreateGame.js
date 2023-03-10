import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogame, getGenres } from "../../redux/action";
/*//////////////////////////////////////////////////////////////////////*/
import NavBar from '../NavBar/NavBar';
import "./CreateGame.css";
/*//////////////////////////////////////////////////////////////////////*/

export default function CreateGame() {
	const dispatch = useDispatch();//Para despachar mis actions
	const history = useHistory();
	const genres = useSelector((state) => state.genres);//Traigo lo que está en mi estado genres
	const platforms = ["PC", "iOS", "Android", "macOS", "PlayStation 4", "PlayStation 5", "XBOX", "PS Vita", "Nintendo", "Desconocido/////////"]
	/*//////////////////////////////////////////////////////////////////////*/
	useEffect(() => {    //Traigo los genres cuando el componente se monta.
		dispatch(getGenres());//Despacho mi action
	}, [dispatch]); //Para que no se genere un loop infinito de llamados
	/*//////////////////////////////////////////////////////////////////////*/
	//Errors
	const [errors, setErrors] = useState({});
	// mi estado para las validaciones ( formulario controlado)
	const validate = (input) => {
		let testValidate = /^[A-Z][a-z][^$()!¡@#/=¿{}?*%&|<>#]*$/;
		let errors = {};

		if(!input.name){
			errors.name = "Require name"
        }else if(!testValidate.test(input.name)){
			errors.name = 'Begin the name with a capital letter, then a lowercase letter. Only the characters "":.,_- are accepted'
        }
		if(!input.description){
			errors.description = "Write a description"
        }else if(100 <= input.description.length){
			errors.description = "Not exceed 100 characters"
		}else if(!testValidate.test(input.description)){
			errors.description = 'Begin the name with a capital letter, then a lowercase letter. Only the characters "":.,_- are accepted'
        }
		if (!input.released){
			errors.released = 'Enter a date ';
		}
		if (!input.rating){
			errors.rating = 'Enter one number from 1 to 5 ';
		}
		return errors;
	};
	/*//////////////////////////////////////////////////////////////////////*/
	const handleChange = (e) => {
		setInput({ // seteamos mi estado input
			...input,// va guardando a medida que escribes
			[e.target.name]: e.target.value,
		});
		setErrors(
			validate({
				...input,// me copio todo lo que venga del formulario, en caso que alguno no cumpla con mis validaciones se advertirá
				[e.target.name]: e.target.value,
			})
			);
			console.log(input);
		};
		
	/*//////////////////////////////////////////////////////////////////////*/
	//Platforms
	/*function handleCheckLike(e){
		if(e.target.checked){  //si el input está check
			setInput({
					...input,
					[e.target.name]: e.target.value,
			})
			console.log(input)
		}
		
	};*/
	
	const handleSelectPlatforms = (el) =>{
		if(!input.platforms.includes(el.target.value)){
			setInput({
				...input,
				platforms: [...input.platforms, el.target.value]
			})
		}else{
			alert(`${el.target.value} is already added`)
		}
	};

	const handleDeletePlatforms = (e) => {
		setInput({
			...input,
			platforms: input.platforms.filter((param) => param !== e),
		});
	};
	/*//////////////////////////////////////////////////////////////////////*/
	//Genres
	const handleSelectGenres = (e) => {
			if (!input.genres.includes(e.target.value)) {
				setInput({
					...input,
					genres: [...input.genres, e.target.value],
				});
			}else{
				alert(`${e.target.value} is already added`)
			}
			
	};
			
	const handleDeleteGenres = (e) => {
		setInput({
			//Me sirve para borrar algun tipo de genre que haya elegido, me crea un nuevo array.
			...input,//traigo el input anterior   
			genres: input.genres.filter((param) => param !== e),// filtro genre por todo lo que no sea ese elemento.(me devuelve el estado nuevo sin el elemento que clickee)
		});
	};
	/*//////////////////////////////////////////////////////////////////////*/
	//Cerebro
	const [input, setInput] = useState({
			name: '',
			description: '',
			//like:[],
			image: '',
			released: '',
			rating: "",
			platforms: [],
			genres: [],
	});

	const handleSubmit = (e) => {
		e.preventDefault(); //Para que no se rompa.(bug)//evitar que suceda la acción predeterminada.
		dispatch(postVideogame(input));
		alert("Videogame created");
		
		setInput({ // seteo mi estado input
			name:"",
			description:"",
			released:"",
			rating:"",
			image: "",
			platforms:[],
			genres:[],
		});
		setErrors(
			validate({
				...input,
				[e.target.value] : e.target.value
			})
			);
			history.push("/Home")
			
		};
	/*//////////////////////////////////////////////////////////////////////*/
	//Button
	const handleClick = (e) =>{
			setErrors(
				validate({
					...input,
					[e.target.name]: e.target.value,
				})
				);
			};
	/*//////////////////////////////////////////////////////////////////////*/		
	return(
		<div className='divCreate'>
			<NavBar />
			<div className='create'>
					<form autoComplete = "off" onSubmit={(e) => handleSubmit(e)}>
						<h1>Creation Area</h1>
					<div>
						<input
							className="formInput"
							type='text'
							placeholder='Name'
							value={input.name}
							name='name'
							onChange={(e) => handleChange(e)}
						/>
						{errors.name && <p className='errorName'>{errors.name}</p>}
					</div>
					{/*<div>
						<input 
							type="checkbox"
							value={input.like}
							name="like"
							onChange={(e) => handleCheckLike(e)}
						/>
					</div>*/}
					<div>
						<textarea
							className="formInputDescription"
							type='text'
							placeholder='Description'
							value={input.description}
							name='description'
							onChange={(e) => handleChange(e)}
						/>
						{errors.description && <p className='errorDescription'>{errors.description}</p>}
					</div>
					<div>
						<input
							className="formInput"
							placeholder='Enter URL Image'
							type='url'
							value={input.image}
							name='image'
							onChange={(e) => handleChange(e)}
						/>
						{errors.image && <p className='error'>{errors.image}</p>}
					</div>
					<div>
						<label className='labelRel'>Released: </label>
						<input
							className="formInputReleased"
							placeholder='Released'
							type='date'
							min='1970-01-01'
							max='2026-12-30'
							value={input.released}
							name='released'
							onChange={(e) => handleChange(e)}
						/>
						{errors.released && <p className='errorReleased'>{errors.released}</p>}
					</div>
					<div>
						<input
							className="formInput"
							placeholder='Rating'
							type='number'
							step='0.1'
							min='1'
							max='5'
							name='rating'
							value={input.rating}
							onChange={(e) => handleChange(e)}
						/>
						{errors.rating && <p className='errorRating'>{errors.rating}</p>}
					</div>

					<div className='selectPlatform'>
						<label>Platforms: </label>	
						<select onChange={(el) => handleSelectPlatforms(el)}>
							<option key="default" value ="default" disabled selected hidden>All platforms</option>
							{platforms?.map((el)=>{
								return(
									<option key={el} value={el}>{el}</option>
								)
							})}
						</select>
					  <div className='deletePlatform'>
					  {input.platforms?.map((e) => {
								return (
									<>
										<div>{e}</div>
										<button type = "button" onClick={() => handleDeletePlatforms(e)}>X</button>
									</>
								);
							})}{' '}
					  </div>
                    </div>

					<div>
						<label className='genre'>Genres: </label>
						<div className='select-genres'>
						
						<select  onChange={(e) => handleSelectGenres(e)}>
							<option key="default" value='default' disabled selected hidden>
								All Genres
							</option>
							{genres?.map((e) => {
								return(
									<option key={e.id} value={e.name}>
										{e.name}
									</option>
								);
							})}
							
						</select>
						</div>
						
					</div>
					{errors.hasOwnProperty('name') || errors.hasOwnProperty('description') || errors.hasOwnProperty('released') || errors.hasOwnProperty('rating') ? <button className='btnCreateDisabled' type="submit" disabled={true} >Create Game</button> : <button type='submit' className='btnCreate' onClick={(e)=> handleClick(e)}> Create Game</button>}
				</form>
				<div className='delete'>	
						{input.genres?.map((el) => {
								return (
									<>
										<div>{el}</div>
										<button onClick={() => handleDeleteGenres(el)}>X</button>
									</>
								);
							})}{' '}
				</div>
				
			</div>
			
		</div>
	);
}