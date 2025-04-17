import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactInfo from './ContactInfo';

describe('ContactInfo 组件', () => {
  test('使用默认地图当没有提供 region 时', () => {
    render(
      <ContactInfo 
        address="Avenida del Queso 45, Tomelloso" 
        phone="+34 926 234 567" 
        email="info@quesoslamancha.es" 
        website="www.quesoslamancha.es"
      />
    );
    
    const mapObject = document.querySelector('object');
    expect(mapObject).toHaveAttribute('data', '/images/regions/default.svg');
  });
  
  test('根据 region 显示对应的地图', () => {
    render(
      <ContactInfo 
        address="Avenida del Queso 45, Tomelloso" 
        phone="+34 926 234 567" 
        email="info@quesoslamancha.es" 
        website="www.quesoslamancha.es"
        region="madrid"
      />
    );
    
    const mapObject = document.querySelector('object');
    expect(mapObject).toHaveAttribute('data', '/images/regions/madrid.svg');
  });
  
  test('显示所有联系信息', () => {
    render(
      <ContactInfo 
        address="Avenida del Queso 45, Tomelloso" 
        phone="+34 926 234 567" 
        email="info@quesoslamancha.es" 
        website="www.quesoslamancha.es"
        region="castilla"
      />
    );
    
    expect(screen.getByText('Avenida del Queso 45, Tomelloso')).toBeInTheDocument();
    expect(screen.getByText('+34 926 234 567')).toBeInTheDocument();
    expect(screen.getByText('info@quesoslamancha.es')).toBeInTheDocument();
    expect(screen.getByText('www.quesoslamancha.es')).toBeInTheDocument();
    
    const mapObject = document.querySelector('object');
    expect(mapObject).toHaveAttribute('data', '/images/regions/castilla.svg');
  });
}); 