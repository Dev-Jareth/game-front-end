import React from 'react';
import Renderer from 'react-test-renderer';
import Enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
Enzyme.configure({ adapter: new Adapter() })
import {SideNavLink} from './';

describe('SideNavLink',()=>{
    it('renders',()=>{
        expect(shallow(<SideNavLink />)).toMatchSnapshot();
    });
    it('correctly accepts exact path',()=>{
        expect(shallow(<SideNavLink />).find('NavLink').props()['exact']).toBeFalsy();
        expect(shallow(<SideNavLink exact={false} />).find('NavLink').props()['exact']).toBeFalsy();
        expect(shallow(<SideNavLink exact />).find('NavLink').props()['exact']).toBe(true);
        expect(shallow(<SideNavLink exact={true} />).find('NavLink').props()['exact']).toBe(true);
    })
    it('displays text',()=>expect(shallow(<SideNavLink>Sample Text</SideNavLink>).find('.side-nav-link-text').text()).toBe('Sample Text'));
    it('correctly has TO',()=>expect(shallow(<SideNavLink to="fakelink" />).find('NavLink').props()['to']).toBe('fakelink'));
    it('displays FA icon',()=>expect(shallow(<SideNavLink icon="house" />).find('.side-nav-link-icon').length).toBe(1));
})