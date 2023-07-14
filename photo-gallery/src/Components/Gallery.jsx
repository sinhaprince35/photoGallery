import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../Components/galleryApp.css";

// API KEY that I have generated from Pixaby
const API_KEY = "38251139-4eec192c31a3f6ea0502e0f9c";

const GalleryApp = () => {
  // The component sets up its initial state using the useState hook.
  // It defines three state variables:
  // 1.images to store the fetched images,
  // 2.searchTerm to track the search input value, and
  // 3.filters to store the selected filters.
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState([]);

  // The useEffect hook is used to fetch images when the component mounts. It calls the fetchImages function.
  useEffect(() => {
    fetchImages();
  }, []);

  // The fetchImages function is an asynchronous function that uses the fetch function to make a request to the Pixabay API.
  // It includes the API key in the URL and specifies the number of images to retrieve per page.

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&per_page=10`
      );
      if (response.ok) {
        const data = await response.json();
        setImages(data.hits);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  //   The handleSearch function is responsible for fetching images based on the user's search input.
  //   It appends the search term to the API URL and performs a similar fetch request as fetchImages.
  //   It updates the images state variable with the retrieved image data.
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&per_page=10`
      );
      if (response.ok) {
        const data = await response.json();
        setImages(data.hits);
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleFilter = (filter) => {
    if (filters.includes(filter)) {
      const updatedFilters = filters.filter((f) => f !== filter);
      setFilters(updatedFilters);
    } else {
      const updatedFilters = [...filters, filter];
      setFilters(updatedFilters);
    }
  };

  // The return statement renders the the UI of the component.
  // It includes an input field and a search button for searching images.
  // The filter checkboxes are displayed, and the images state variable is mapped over to render the retrieved images within a Carousel component.

  return (
    <div className="gallery-app">
      <h1>Photo Gallery</h1>
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search images"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <div className="filters">
        <label>
          <input
            type="checkbox"
            checked={filters.includes("category1")}
            onChange={() => handleFilter([...filters, "category1"])}
          />
          Category 1
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.includes("category2")}
            onChange={() => handleFilter([...filters, "category2"])}
          />
          Category 2
        </label>
        {/* Add more filter options as needed */}
      </div>
      <div>
        <Carousel showThumbs={false}>
          {images.map((image) => (
            <div className="image-item" key={image.id}>
              <img src={image.webformatURL} alt={image.tags} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default GalleryApp;
