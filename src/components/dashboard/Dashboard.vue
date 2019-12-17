<template>
    <v-container>
        <v-layout row wrap>
            <Nav/>
        </v-layout>
        <router-view/>
    </v-container>
</template>

<script>
import Nav from "./Nav"
export default {
    components:{
        Nav
    }
}
</script>