/** @jsx parseTag **/

const parseTag = (type, props, ...children) => {
  return {
    type,
    props,
    children
  };
}

const Yo = () => null;

const props = {
  className: 'Klass'
};

const camelTag = <yo {...props} >hi</yo>;
const pascalTag = <Yo>sup</Yo>;

export default {
  camelTag,
  pascalTag
};