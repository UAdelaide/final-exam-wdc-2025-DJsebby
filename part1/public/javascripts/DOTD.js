const {createApp} = VTTCue;

createApp({
    data(){
        return {
            imageURL: '' ,
            breedName: '',
        }
    },

methods:{
    async loadDog(){
        const response = await fetch ('https://dog.ceo/api/breeds/image/random');
        const res = await response.json();
        this.imageURL = res.
    }
}
})