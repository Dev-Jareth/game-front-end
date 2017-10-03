import React from 'react';
import Renderer from 'react-test-renderer';
import Enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {MemoryRouter as R} from 'react-router-dom';
Enzyme.configure({ adapter: new Adapter() })
import {Anchor} from './';

describe('Anchor',()=>{
    it('renders',()=>{
        expect(Renderer.create(<R><Anchor>Anchor Text</Anchor></R>)).toMatchSnapshot();
    })
    
  it('correctly has error display',()=>{
    expect(shallow(<Anchor />).hasClass('error')).toBe(false);
    expect(shallow(<Anchor error={false} />).hasClass('error')).toBe(false);
    expect(shallow(<Anchor danger={false} />).hasClass('error')).toBe(false);
    expect(shallow(<Anchor error />).hasClass('error')).toBe(true);
    expect(shallow(<Anchor danger />).hasClass('error')).toBe(true);
    expect(shallow(<Anchor error={true} />).hasClass('error')).toBe(true);
    expect(shallow(<Anchor danger={true} />).hasClass('error')).toBe(true);
  });
  it('correctly has success display',()=>{
    expect(shallow(<Anchor />).hasClass('success')).toBe(false);
    expect(shallow(<Anchor success={false} />).hasClass('success')).toBe(false);
    expect(shallow(<Anchor success />).hasClass('success')).toBe(true);
    expect(shallow(<Anchor success={true} />).hasClass('success')).toBe(true);
  });
  it('correctly has warning display',()=>{
    expect(shallow(<Anchor />).hasClass('warning')).toBe(false);
    expect(shallow(<Anchor warning={false} />).hasClass('warning')).toBe(false);
    expect(shallow(<Anchor warning />).hasClass('warning')).toBe(true);
    expect(shallow(<Anchor warning={true} />).hasClass('warning')).toBe(true);
  });
  it('correctly has info display',()=>{
    expect(shallow(<Anchor />).hasClass('info')).toBe(false);
    expect(shallow(<Anchor info={false} />).hasClass('info')).toBe(false);
    expect(shallow(<Anchor info />).hasClass('info')).toBe(true);
    expect(shallow(<Anchor info={true} />).hasClass('info')).toBe(true);
  });
  it('correctly has disable display',()=>{
    expect(shallow(<Anchor />).props()['disabled']).toBeFalsy();
    expect(shallow(<Anchor disabled={false} />).props()['disabled']).toBeFalsy();
    expect(shallow(<Anchor disabled />).props()['disabled']).toBe(true);
    expect(shallow(<Anchor disabled={true} />).props()['disabled']).toBe(true);
  })
  it('accepts an onUpdate function',()=>{
    //Init
    const mockCallback = jest.fn();
    let tree = shallow(<Anchor onClick= {mockCallback} />)
    //Alter
    tree.simulate('click')
    //Check
    expect(mockCallback.mock.calls.length).toMatchSnapshot();
  });
  it('accepts TO parameter',()=>expect(shallow(<Anchor to="fakePath" />).props()['to']).toBe('fakePath'));
  it('correctly handles sizes',()=>{
    expect(shallow(<Anchor size='large' />).hasClass('large')).toBe(true);
    expect(shallow(<Anchor size='small' />).hasClass('small')).toBe(true);
    expect(shallow(<Anchor size='huge' />).hasClass('huge')).toBe(true);
  })
})