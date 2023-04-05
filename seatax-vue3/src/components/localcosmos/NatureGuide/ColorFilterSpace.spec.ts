import { expect, describe, test, vitest, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import ColorFilterSpace from './ColorFilterSpace.vue';

let identificationKey = null;
const createWrapper = (props = {}) => {
  const defaultProps = {
    space: {
      html: 'rgba(100, 100, 100, 1)',
      isSelected: false,
      isPossible: true,
      identificationKey,
    },
    definition: {},
    readOnly: false,
  };

  return mount(ColorFilterSpace, {
    props: { ...defaultProps, ...props },
  });
};

describe('ColorFilterSpace', () => {
  beforeEach(() => {
    identificationKey = {
      findSpaceIndex: vitest.fn(() => 0),
      selectSpace: vitest.fn(() => true),
      deselectSpace: vitest.fn(() => true),
    };
  });

  test('renders normally', () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.element.className).toContain('cursor-pointer');
    expect(wrapper.html()).toContain('rgba(100, 100, 100, 1)');
  });

  test('clicking a the space tiggers a select', async () => {
    const wrapper = createWrapper();
    await wrapper.find('div.flex').trigger('click');
    expect(identificationKey.findSpaceIndex).toHaveBeenCalled();
  });

  test('renders not-clickeable when read only', () => {
    const wrapper = createWrapper({ readOnly: true });
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.element.className).not.toContain('cursor-pointer');
  });

  test('clicking a disabled does not tigger a select', async () => {
    const wrapper = createWrapper({ readOnly: true });
    await wrapper.find('div.flex').trigger('click');
    expect(identificationKey.findSpaceIndex).not.toHaveBeenCalled();
  });
});
