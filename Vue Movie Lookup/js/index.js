// extract the unique country names

const rawYearList = movieJson.map(item => item.year);
const yearList = rawYearList.filter((item, index, self) => self.indexOf(item) === index);
yearList.sort();

console.log(rawYearList);
console.log(yearList);

Vue.component("v-select", VueSelect.VueSelect);

var app = new Vue({
    el: "#vue-app",
    data: {        
        years: yearList,
        yearSelected: "",
        movies: [ ],
        movieSelected: null,
        wikipediaBaseUrl: "https://en.wikipedia.org/wiki/"
        
    },

    methods: {
        fetchMovies: function() {
            console.log("fetchMovies called for " + this.yearSelected);

            let matches = movieJson.filter(item => item.year == this.yearSelected);
            matches.sort((lhs, rhs) => lhs.name < rhs.name ? -1 : 1);


            matches.forEach(movie => {
                const encodedTitle = encodeURIComponent(movie.href);
                movie.href = this.wikipediaBaseUrl + encodedTitle;
            });

            console.log(matches);
            this.movies = matches;
        }
        
    }

});
