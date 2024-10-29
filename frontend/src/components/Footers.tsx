import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();  
    
  return (
    <footer className='mt-auto' style={{ width: '100%' }}>
      <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Manrope, sans-serif', color: '#546E7A', fontSize: '0.7875rem'}}>
        <Row  className="justify-content-center">
          <Col xs="auto" className='text-center py-3'>
            <p>&copy;{currentYear} ForcesHorizon</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;