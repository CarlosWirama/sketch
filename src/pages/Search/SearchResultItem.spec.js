import React from 'react';
import renderer from 'react-test-renderer';
import SearchResultItem from './SearchResultItem';

const pokemonListItemMock = {
  kantoDex: '001',
  name: 'Bulbasaur',
  types: ['Grass', 'Poison'],
};

describe('SearchResultItem', () => {
  const onClickMock = jest.fn();

  // TODO dunno how to test this for now
  // it('should throw error when listItem prop is missing', () => {

  it('should render listItem props', () => {
    // TODO enzyme mount
    expect(0).toEqual(1);
  });

  // render the component here and reuse in below tests
  const component = renderer.create(
    <SearchResultItem
      listItem={pokemonListItemMock}
      onClick={onClickMock}
    />,
  );
  let tree = component.toJSON();

  it('should render without fail', () => {
    expect(tree).toMatchSnapshot();
  });


  it('should handle click correctly', () => {
    // manually trigger the callback
    tree.props.onClick();

    // check whether the function successfully called
    expect(onClickMock.mock.calls.length).toBe(1);

    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  const THIS_MANY_CLICKS = 20;
  it(`should handle ${THIS_MANY_CLICKS} clicks correctly`, () => {
    // clear previous history
    onClickMock.mockClear();

    // trigger THIS_MANY_CLICKS times
    for(let i = 0; i < THIS_MANY_CLICKS; i++) {
      tree.props.onClick();
    }

    // check whether the function successfully called
    expect(onClickMock.mock.calls.length).toBe(THIS_MANY_CLICKS);

    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
