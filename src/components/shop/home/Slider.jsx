import React, { useState, useEffect } from 'react';

const itemsData = [
  'https://images.pexels.com/photos/757432/pexels-photo-757432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1367243/pexels-photo-1367243.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/3849551/pexels-photo-3849551.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/5076512/pexels-photo-5076512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

const textData = [
  "Bringing Sierra Leone markets online",
  "Sell fresh food directly from farm",
  "Take your car sale and market online",
  "Browse products in Freetown directly from your devices",
  "Shop for clothing directly from Freetown Mart"
];

const Item = ({ imageUrl, text, onClick, expanded }) => {
  const width = expanded ? '42vw' : '10vw';
  const backgroundSize = expanded ? '100%' : '45vh';

  return (
    <div
      className="item"
      style={{ backgroundImage: `url(${imageUrl})`, width, backgroundSize }}
      onClick={onClick}
    >
      <p className="text-white absolute bottom-0 left-0 w-full p-4 text-center">{text}</p>
    </div>
  );
};

const Slider = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const expandItem = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setExpandedIndex((prevIndex) => {
        if (prevIndex === null) {
          return 0; // Expand the first item
        } else {
          return (prevIndex + 1) % itemsData.length; // Expand the next item in a circular manner
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="group my-8 mx-4" style={{ marginTop: 120 }}>
      <h1 className="text-base my-12" style={{ fontSize: 60 }}>
        WELCOME TO <span className="text-primary-one font-bold">FREETOWN MART</span>
      </h1>
      {itemsData.map((imageUrl, index) => (
        <Item
          key={index}
          imageUrl={imageUrl}
          text={textData[index]}
          onClick={() => expandItem(index)}
          expanded={expandedIndex === index}
        />
      ))}
    </div>
  );
};

export default Slider;
