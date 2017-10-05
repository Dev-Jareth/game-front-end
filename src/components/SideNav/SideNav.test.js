import React from 'react';
import Renderer from 'react-test-renderer';
import Enzyme, {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
Enzyme.configure({adapter: new Adapter()})
import {SideNav} from './';

describe('SideNav component', () => {
    it('should render', () => expect(Renderer.create(<SideNav/>)).toMatchSnapshot());
    it('should render links', () => {
        let links = [
            {
                to: '/',
                icon: 'house',
                exact: true,
                content: 'home'
            }, {
                to: '/fakePath',
                exact: false,
                content: 'Not real'
            }
        ]
        expect(shallow(<SideNav links={links}/>).find('SideNavLink').length).toBe(2);
    })
})