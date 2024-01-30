import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api/api";
import { MdOutlineMovieFilter } from "react-icons/md";
import Select from "react-select";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { IoMdArrowBack } from "react-icons/io";

const MovieEdit = () => {
    const params = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [imdb, setImdb] = useState("");
  const [movieTime, setMovieTime] = useState("");
  const [originID, setOriginID] = useState("");
  const [explanation,setExplanation]=useState("");
  const [handleCategory, setHandleCategory] = useState({
    value: "Seçiniz",
    label: "Seçiniz",
  });

  useEffect(()=>{

    api.get(`http://localhost:3004/movies/${params.id}`)
    .then((res)=>{
        setName(res.data.name)
        setDate(res.data.date)
        setImage(res.data.image)
        setImdb(res.data.imdb)
        setMovieTime(res.data.time)
        setHandleCategory({value:res.data.categories, label:res.data.categories})
        setOriginID(res.data.id)
        setExplanation(res.data.explanation)
    })
    .catch((err)=>{console.log(err.data)})
  },[])

  const options = [
    {
      value: "Animasyon",
      label: "Animasyon",
    },
    {
      value: "Fantezi",
      label: "Fantezi",
    },
    {
      value: "Aksiyon",
      label: "Aksiyon",
    },
    {
      value: "Komedi",
      label: "Komedi",
    },
    {
      value: "Drama",
      label: "Drama",
    },
  ];
 //SELECT CUSTOMIZE
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#436850',
      borderColor: '#ADBC9F'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#436850',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#436850' : '#ADBC9F',
      color: 'white',
      '&:hover':{
        backgroundColor:'#436850',
        color:'white'
      }
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: '#436850',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#436850',
      '&:hover':{
        color:'white'
      } 
    }),
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   

    const postData = {
      name,
      id: originID,
      image,
      date,
      imdb,
      time: movieTime,
      categories: handleCategory.label,
      explanation,
    };

    try {
      await api.put(`http://localhost:3004/movies/${originID}`, postData);
      Swal.fire({
        title: 'Film Güncellendi',
        icon: 'success',
        confirmButtonText: 'Tamam',
        confirmButtonColor:'#436850',
        
        customClass: {
          popup: 'bg-[#12372A] text-white',
          title: 'text-white',
          content: 'text-white',
          confirmButton: 'bg-[#436850] hover:bg-[#436850] text-white',
        }
      });
    } catch (error) {
      console.error('Film eklenirken bir hata oluştu', error);
      Swal.fire({
        title: 'Film Eklenemedi',
        text: 'Film ekleme başarısız oldu.',
        icon: 'error',
        customClass: {
          popup: 'bg-[#12372A] text-white', // Uyarı penceresinin arkaplan rengi
          title: 'text-[#ADBC9F]',
          content: 'text-white',
          confirmButton: 'bg-[#3085d6] hover:bg-[#1B5299]', // "Tamam" butonunun rengi
        }
      });
    }
  };
  return (
    <>
      <Header />

      <form
        onSubmit={handleSubmit}
        className="m-32 justify-center ml-72 mr-72 text-gray-900 bg-[#436850]  pr-3 gap-3 rounded-lg"
      >
        <div>
          <div className="justify-center ml-3">
            <label className="flex font-semibold ">Film Adı :</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-2 mb-4 rounded-xl border-2 border-[#FBFADA] bg-[#ADBC9F] h-11 focus:border-[#12372A] focus:outline-none"
            />
          </div>
          <div className="justify-center ml-3">
            <label className="flex font-semibold ">Film Süresi :</label>
            <input
              type="text"
              value={movieTime}
              onChange={(e) => setMovieTime(e.target.value)}
              className="w-full pl-2 mb-4 rounded-xl border-2 border-[#FBFADA] bg-[#ADBC9F] h-11 focus:border-[#12372A] focus:outline-none"
            />
          </div>
          <div className="justify-center ml-3">
            <label className="flex font-semibold ">Çıkış Tarihi :</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-2 mb-4 rounded-xl border-2 border-[#FBFADA] bg-[#ADBC9F] h-11 focus:border-[#12372A] focus:outline-none"
            />
          </div>
          <div className="justify-center ml-3">
            <label className="flex font-semibold ">Imdb Puanı :</label>
            <input
              type="text"
              value={imdb}
              onChange={(e) => setImdb(e.target.value)}
              className="w-full pl-2 mb-4 rounded-xl border-2 border-[#FBFADA] bg-[#ADBC9F] h-11 focus:border-[#12372A] focus:outline-none"
            />
          </div>
          <div className="justify-center ml-3">
            <label className="flex font-semibold ">Kategoriler :</label>
            <Select
              styles={customStyles}
              value={handleCategory}
              onChange={(e) => setHandleCategory(e)}
              options={options}
              className="w-full pl-2 mb-4  h-11"
            ></Select>
          </div>
          <div className="justify-center ml-3">
            <label className="flex font-semibold ">
              Poster Linki :{" "}
              <span className="help-block">
                Posteri hizliresim.com sitesinden yükleyip linki yapıştırınız.{" "}
              </span>
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full pl-2 mb-4 rounded-xl border-2 border-[#FBFADA] bg-[#ADBC9F] h-11 focus:border-[#12372A] focus:outline-none"
            />
          </div>

          <div className="justify-center ml-3">
            <label className="flex font-semibold ">
              Film Açıklaması :
             
            </label>
            <textarea
              type="text"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="w-full pl-2 mb-4 rounded-xl border-2 border-[#FBFADA] bg-[#ADBC9F] h-32 focus:border-[#12372A] focus:outline-none"
            />
          </div>
        </div>
        <div>
        <div className="float-left items-center mt-1 w-32">
           <Link to={"/"} >
           <button className="bg-[#FBFADA] text-black font-semibold border-2 border-[#436850] hover:text-[#FBFADA] hover:bg-[#ADBC9F] rounded-full w-full h-11 gap-3 flex items-center pr-3 pl-3 ">
          <IoMdArrowBack/> Geri Dön
          </button>
           </Link>
         
          </div>
          <div className="float-right items-center mt-1 w-32">
          <button
            type="submit"
            className="bg-[#436850] text-white font-semibold border-2 border-[#436850] hover:text-[#12372A] hover:bg-[#FBFADA] rounded-full w-full h-11 gap-3 flex items-center justify-center pr-3 pl-3 "
          >
             Kaydet <MdOutlineMovieFilter />
          </button>
        </div>
        </div>
       
      </form>
    </>
  );
};

export default MovieEdit;
