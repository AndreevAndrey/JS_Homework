class Tasks {
    constructor() {
        this.defaultTasks = [
            ["Какая крейсерская скорость большинства самолетов гражданской авиации?", "600 км/ч", "700 км/ч", "950" +
            " км/ч", "1100 км/ч", 3, "url('https://s1.1zoom.me/b5046/340/Passenger_Airplanes_Sky_Clouds_Flight_520179_1920x1080.jpg')"],
            ["Самый массовый в мире реактивный пассажирский самолет?", "Tу-154", "Boieng-737", "Як-40", "Airbus-320", 2, "url('http://wallpapers-image.ru/1920x1080/aircraft/wallpapers/wallpapers-aircraft-29.jpg')"],
            ["Кто изобрел первый в мире самолет?", "братья Райт", "Кейли", "Леонардо да Винчи", "Телешов", 1, "url('http://hq-oboi.ru/photo/samolety_bumazhnyy_1920x1080.jpg')"],
            ["Максимальная высота полёта пассажирского авиаллайнера?", "5000 м", "8000 м", "12000 м", "20000", 3, "url('https://images.wallpaperscraft.ru/image/illiuminator_okno_samolet_krylo_samoleta_133479_1920x1080.jpg')"],
            ["Механизм управления тягой называется:", "Штурвал", "Педаль", "РУД", "Газ", 3, "url('https://i.pinimg.com/originals/f7/04/af/f704af25b8a72668b8acc09ec48dde58.jpg')"],
            ["Самая безопасная аварийная посадка", "Без шасси", "На шоссе", "В поле", "На воду", 4, "url('https://politeka.net/wp-content/uploads/2019/05/1-47-12.jpg')"],
        ];
        for (let i = 0; i < this.defaultTasks.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.defaultTasks[i], this.defaultTasks[j]] = [this.defaultTasks[j], this.defaultTasks[i]];
        }
        return this.defaultTasks;
    }
}

export default Tasks;