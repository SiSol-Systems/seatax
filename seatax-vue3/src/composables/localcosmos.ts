import type { MatrixFilterSpace } from '@/types/localcosmos/src/features/NatureGuide';
import type { FrontendUserContentImage } from '@/types/localcosmos/src/features/TemplateContent';
import { useNatureGuideStore } from '@/stores/nature-guides';

export const useLocalcosmos = () => {
  return {
    classesForSpace: (space: MatrixFilterSpace) => {
      const natureGuideStore = useNatureGuideStore();
      const key = natureGuideStore.currentNode;
      if (!key) {
        throw new Error('No identification key loaded');
      }

      const isSelected = key.isSpaceSelected(space);
      const isPossible = key.isSpacePossible(space);

      return {
        'is-selected': isSelected,
        'is-possible box-shadow': isPossible,
        '': !isSelected,
        'border-green': isSelected,
        'opacity-30 border-transparent': !isPossible,
        'border-white': isPossible && !isSelected,
      };
    },
    toggleSelect: (space: MatrixFilterSpace, encodedSpace = null) => {
      const natureGuideStore = useNatureGuideStore();
      const key = natureGuideStore.currentNode;
      if (!key) {
        throw new Error('No identification key loaded');
      }

      const index = key.findSpaceIndex(space);
      if (key.isSpaceSelected(space)) {
        key.deselectSpace(index, encodedSpace);
      } else {
        key.selectSpace(index, encodedSpace);
      }
    },
  };
};

export const useImagesToSrcset = (image: FrontendUserContentImage | undefined, fallback: string | null = null) => {
  if (!image) {
    return fallback;
  }

  if (Object.keys(image).length === 0) {
    return fallback;
  }

  return Object.entries(image).map(([r, url]) => `${url} ${r}`).join(', ');
};
