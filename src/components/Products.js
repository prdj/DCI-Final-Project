import React from 'react';
import Octave from './Octave';
import Volume from './Volume';
import Visualizer from './Visualizer';

const Products = () => {
  return (
    <div>
      <section>
        <Volume></Volume>
        <Octave></Octave>
        <Visualizer></Visualizer>
      </section>
    </div>
  );
};

export default Products;
