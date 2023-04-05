<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Home from '@/components/ui/icons/Home.vue';
import Menu from '@/components/ui/icons/Menu.vue';
import Comment from '@/components/ui/icons/Comment.vue';
import Security from '@/components/ui/icons/Security.vue';
import Close from '@/components/ui/icons/Close.vue';
import Tiles from '@/components/ui/icons/Tiles.vue';
import TilesLarge from '@/components/ui/icons/TilesLarge.vue';
import Heart from '@/components/ui/icons/Heart.vue';
import Info from '@/components/ui/icons/Info.vue';
import Marker from '@/components/ui/icons/Marker.vue';
import Bookmark from '@/components/ui/icons/Bookmark.vue';
import Undo from '@/components/ui/icons/Undo.vue';
import Logout from '@/components/ui/icons/Logout.vue';
import Login from '@/components/ui/icons/Login.vue';
import Folder from '@/components/ui/icons/Folder.vue';
import Search from '@/components/ui/icons/Search.vue';
import Filter from '@/components/ui/icons/Filter.vue';
import Settings from '@/components/ui/icons/Settings.vue';
import User from '@/components/ui/icons/User.vue';
import Eye from '@/components/ui/icons/Eye.vue';
import Back from '@/components/ui/icons/Back.vue';
import Guide from '@/components/ui/icons/Guide.vue';

const props = defineProps({
  name: { type: String, required: true },
  size: { type: Number, default: 20 },
  color: { type: String, default: 'currentcolor' },
});

const icon = computed(() => {
  switch (props.name) {
    case 'home': return Home;
    case 'menu': return Menu;
    case 'comment': return Comment;
    case 'security': return Security;
    case 'close': return Close;
    case 'tiles': return Tiles;
    case 'tiles-large': return TilesLarge;
    case 'heart': return Heart;
    case 'info': return Info;
    case 'marker': return Marker;
    case 'bookmark': return Bookmark;
    case 'undo': return Undo;
    case 'logout': return Logout;
    case 'login': return Login;
    case 'folder': return Folder;
    case 'search': return Search;
    case 'filter': return Filter;
    case 'settings': return Settings;
    case 'user': return User;
    case 'eye': return Eye;
    case 'back': return Back;
    case 'guide': return Guide;
  }
});

</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 23 23"
    :width="size"
    :height="size"
    :stroke="color"
    :fill="color"
    class="pointer-events-none inline-block"
    stroke-linecap="round"
    stroke-width="2"
    stroke-linejoin="round"
  >
    <component :is="icon" class="pointer-events-none" />
  </svg>
</template>
