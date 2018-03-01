'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Medicines',[{
      name: 'Obat luka',
      brand: 'Betadine',
      description: 'luka lecet, sayat, atau garukan, mencegah infeksi pada luka bakar minor, dan menghilangkan bekas luka',
      minGenA: 13,
      maxGenA: 20,
      minGenB: 30,
      maxGenB: 45,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Suplemen Multivitamin',
      brand: 'Max c-100,Nutra care,Enervon-C',
      description: 'Mempercepat proses pemulihan tubuh, menjaga kekebalan tubuh agar tidak mudah sakit',
      minGenA: 40,
      maxGenA: 60,
      minGenB: 23,
      maxGenB: 43,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Suplemen Multivitamin',
      brand: 'Holisticare,Im-boost,Stimuno',
      description: 'merangsang tubuh untuk memproduksi lebih banyak zat antibodi dan membuat sistem kekebalan tubuh dapat bekerja dengan lebih baik agar daya tahan tubuh Anda tetap terjaga.',
      minGenA: 5,
      maxGenA: 20,
      minGenB: 10,
      maxGenB: 17,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Obat Luka',
      brand: 'Gentamicin',
      description: 'mengeringkan luka dan menyembukan berbagai macam luka ' ,
      minGenA: 10,
      maxGenA: 20,
      minGenB: 20,
      maxGenB: 35,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Obat asam lambung',
      brand: 'Mylanta,Compraz',
      description: 'Obat ini bekerja dengan menetralkan asam dalam perut menginaktifkan pepsin, sehingga mengurangi rasa sakit ulu hati dampak iritasi oleh asam lambung & pepsin',
      minGenA: 17,
      maxGenA: 28,
      minGenB: 22,
      maxGenB: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Obat pereda nyeri',
      brand: 'Panadol,Biogesic',
      description: ' menangani berbagai macam penyakit seperti sakit kepala, nyeri otot, arthritis, sakit pinggang, sakit gigi, menggigil, dan demam. dapat juga digunakan untuk beberapa penyakit seperti menggigil dan gejala flu',
      minGenA: 10,
      maxGenA: 23,
      minGenB: 20,
      maxGenB: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Obat pereda nyeri ',
      brand: 'Sanmol,Bodrex,Mixagrip',
      description: ' menangani berbagai macam penyakit seperti sakit kepala, nyeri otot, arthritis, sakit pinggang, sakit gigi, menggigil, dan demam. Panadol dapat juga digunakan untuk beberapa penyakit seperti menggigil dan gejala flu',
      minGenA: 20,
      maxGenA: 27,
      minGenB: 22,
      maxGenB: 32,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Obat demam',
      brand: 'Biogesic,Inzana,Tromboss',
      description: 'menurunkan panas tinggi , serta mengurangi pusing yang diakibatkan demam',
      minGenA: 22,
      maxGenA: 32,
      minGenB: 33,
      maxGenB: 44,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Obat demam',
      brand: 'Tempra-forte,fenris',
      description: 'menurunkan panas tinggi, serta mengurangi pusing yang diakibatkan demam',
      minGenA: 10,
      maxGenA: 20,
      minGenB: 5,
      maxGenB: 11,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Obat alergi',
      brand: 'Fexofenadine,Loratadine',
      description: '. Obat ini bisa melawan gejala alergi tanpa menyebabkan kantuk, ampuh mengatasi alergi gatal-gatal' ,
      minGenA: 4,
      maxGenA: 13,
      minGenB: 20,
      maxGenB: 30,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Obat batuk',
      brand: 'OBH combi,Woods',
      description: 'mengurangi batuk kering',
      minGenA: 2,
      maxGenA: 10,
      minGenB: 29,
      maxGenB: 32,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Obat luar',
      brand: 'Salep Bioplaceton',
      description: 'Bioplacenton mengandung dua bahan aktif yang sangat berperan besar dalam proses penyembuhan luka, yaitu Placenta extract 10% dan Neomycin Sulfate 0,5%',
      minGenA: 13,
      maxGenA: 20,
      minGenB: 12,
      maxGenB: 23,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
