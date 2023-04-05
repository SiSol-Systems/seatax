<template>
    <div class="hidden xl:flex flex footer py-10 justify-center items-center">
        <div class="container">
            <div class="footer-content flex flex-row items-center flex-wrap">
                <div>
                    <router-link :to="{ name: 'privacy-policy'}">
                        Privacy policy
                    </router-link>
                </div>
                <div>
                    <router-link :to="{ name: 'legal-notice'}">
                        Legal Notice
                    </router-link>
                </div>
                <div>
                    <router-link :to="{ name: 'terms-of-use'}">
                        Terms Of Use
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.footer {
    background-color: var(--secondary-app-color);
    width: 100vw;
}

.footer {
    text-transform: uppercase;
    color: var(--white);
}

.footer-content {
    justify-content: space-evenly;
}

@media (min-width: 640px) {

}
/* md */
@media (min-width: 768px) {

}

/* lg */
@media (min-width: 1024px) { 

}

/* xl */
@media (min-width: 1280px) {

}

/* 2xl */
@media (min-width: 1536px) {

}

</style>
