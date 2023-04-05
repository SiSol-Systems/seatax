import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils';
import DescriptiveTextAndImagesFilterSpace from './DescriptiveTextAndImagesFilterSpace.vue';

const createWrapper = (props = {}) => {
  const defaultProps = {
    space: {
      imageUrl: { '1x': 'https://example.com/1x.png', '2x': 'https://example.com/2x.png' },
      isSelected: false,
      isPossible: true,
      encodedSpace: 'encodedSpace',
      filter: {
        name: 'filter',
      },
    },
    definition: {},
    readOnly: false,
  };

  return mount(DescriptiveTextAndImagesFilterSpace, {
    props: { ...defaultProps, ...props },
  });
};

describe('DescriptiveTextAndImagesFilterSpace', () => {
  test('renders normally', () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.element.className).toContain('cursor-pointer');
    expect(wrapper.html()).toContain('encodedSpace');
  });

  test('renders not-clickeable when read only', () => {
    const wrapper = createWrapper({ readOnly: true });
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.element.className).not.toContain('cursor-pointer');
  });
});
