import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api/api";
import { MdDelete } from "react-icons/md";
import { MdOutlineMovieFilter } from "react-icons/md";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    api
      .get("http://localhost:3004/movies")
      .then((res) => {
        console.log(res.data);
        setMovies(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDeleteMovie = (movieID) => {
    Swal.fire({
      title: 'Silmek istediğinize emin misiniz?',
      text: 'Bilgiler kalıcı olarak silinecek!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D24545',
      cancelButtonColor: '#436850',
      cancelButtonText:"Hayır",
      confirmButtonText: 'Evet', 
      customClass: {
        popup: 'bg-[#12372A] text-white',}
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`http://localhost:3004/movies/${movieID}`)
          .then(() => {
            setMovies(movies.filter((movie) => movie.id !== movieID));
            Swal.fire({
              title: 'Silindi!',
              text: 'Film silindi.',
              icon: 'success',
              confirmButtonColor: '#FBFADA',
              confirmButtonText: 'Tamam',
              customClass: {
                popup: 'bg-[#12372A] text-white'}
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: 'Hata!',
              text: 'Film silinirken bir hata oluştu.',
              icon: 'error',
              customClass: {
                popup: 'bg-[#12372A] text-white'}
            });
          });
      }
    });
  };

  const handleOpenMovie = (movie) => {
    setSelectedMovie(movie);
  };
  const handleCloseMovie = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Header />

      <div
        style={{
          paddingLeft: "175px",
          paddingRight: "175px",
          marginTop: "20px",
        }}
        className="relative overflow-x-auto justify-center items-center  "
      >
        <div className="flex items-center justify-between mb-3 ">
          <input
            onChange={(e) => setSearchName(e.target.value)}
            className="pl-2 w-72 block border border-[#FBFADA]  focus:border-[#FBFADA] rounded-lg  h-9 text-sm text-white placeholder:text-white  "
            style={{ outline: "none",backgroundColor:"#436850" }}
            type="text"
            placeholder="Film Ara.."
            value={searchName}
          />
          <div className="flex items-center ">
            <Link to={"/addMovie"}>
              <button className="bg-[#436850] text-white font-semibold border-2 border-[#436850] hover:text-[#12372A] hover:bg-[#FBFADA] rounded-full w-full h-11 gap-3 flex items-center pr-3 pl-3 ">
                Film Ekle <MdOutlineMovieFilter />
              </button>
            </Link>
          </div>
        </div>

        <table  className="w-full text-sm text-left rtl:text-right mb-2  text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs    text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-[#436850]"> 
              <th scope="col" className="px-6 py-3 ">
                Poster
              </th>
              <th scope="col" className="px-6 py-3">
                Film Adı
              </th>
              <th scope="col" className="px-6 py-3">
                Süresi
              </th>
              <th scope="col" className="px-6 py-3">
                Çıkış Tarihi
              </th>
              <th scope="col" className="px-6 py-3">
                Imdb Puanı
              </th>
              <th scope="col" className="px-6 py-3">
                Kategoriler
              </th>
              <th scope="col" className="px-6 py-3">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody >
            {movies
              .filter((item) =>
                item.name.toLowerCase().includes(searchName.toLocaleLowerCase())
              ).sort((a,b)=>a.name.localeCompare(b.name))
              .map((item, index) => (
                <tr 
                  className=" border-b text-black bg-[#ADBC9F] dark:bg-gray-800   " //TABLO ARKAPLAN RENGİ
                  key={item.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img className="w-24" src={item.image} alt={item.name} />
                  </th>
                  <td
                    className="px-6 py-4 text-base font-normal cursor-pointer hover:font-semibold"
                    onClick={() => handleOpenMovie(item)}
                  >
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-base font-normal">{item.time}</td>
                  <td className="px-6 py-4 text-base font-normal">{item.date}</td>
                  <td className="px-6 py-4 text-base font-normal">{item.imdb}</td>
                  <td className="px-6 py-4 text-base font-normal">{item.categories}</td>
                  <td>
                    <div className="cursor-pointer items-center gap-3 ml-5 flex">
                      <Link to={`/editMovie/${item.id}`} >
                      <FiEdit
                       className="text-blue-600 font-semibold items-center text-2xl"
                      />
                      </Link>
                      

                      <MdDelete
                        onClick={() => handleDeleteMovie(item.id)}
                        className="text-red-600 font-semibold items-center text-2xl"
                      />
                    </div>
                    
                  </td>
                </tr>
              ))}
          </tbody>
          {selectedMovie && (
            <div
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
              style={{ zIndex: 1000 }}
            >
              <div className="grid grid-cols-2 bg-[#12372A] text-white p-5 rounded-md">
                <div className="col-span-1">
                  <img className="w-72" src={selectedMovie.image} alt={selectedMovie.name} />
                </div>
                <div className="col-span-1 pl-5">
                  <span className="font-bold text-[#ADBC9F]">
                    {selectedMovie.name} :
                  </span>
                  <p className="w-60">{selectedMovie.explanation}</p>
                  <button
                    className="font-bold w-24 h-11 bg-[#436850] text-white border-2 border-[#436850] rounded-full hover:text-[#12372A] hover:bg-[#FBFADA] mt-3 float-right"
                    onClick={handleCloseMovie}
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          )}
        </table>
      </div>
    </>
  );
};

export default MovieList;
