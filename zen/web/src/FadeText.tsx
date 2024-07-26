import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

const FadeTypography = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
  >
    <Typography color="white" variant="h4">
      {children}
    </Typography>
  </motion.div>
);

const FadeText = ({ text }) => {
  const [currentText, setCurrentText] = useState(text);

  useEffect(() => {
    console.log('text', text);
    setCurrentText(text);
  }, [text]);

  return (
    <Grid
      container
      justifyContent="center"
      style={{ height: '100vh', padding: '10em' }}
      className="text-overlay"
    >
      <AnimatePresence mode="wait">
        <FadeTypography key={currentText}>{currentText}</FadeTypography>
      </AnimatePresence>
    </Grid>
  );
};

FadeText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FadeText;
