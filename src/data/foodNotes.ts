export type FoodNote={title:string;description:string;also?:string;source:string;japanese?:string;english?:string;image?:string;imageCredit?:string;imageLicense?:string;imagePage?:string};
const takoyakiPhoto='Takoyaki_in_Osaka.jpg';
const hidaPhoto='Sushi,_Hida_Beef.jpg';
const commonsImage=(file:string)=>`https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=700`;
const commonsPage=(file:string)=>`https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
export const foodNotes:Record<string,FoodNote>={
  dotonbori:{title:'Takoyaki',description:'Bolitas de masa hechas en molde, con trozos de pulpo. Se sirven calientes, normalmente con salsa, mayonesa y copos de bonito. Son el bocado más característico para probar aquí.',also:'Si preferís sentaros, buscad okonomiyaki: una tortita salada de col y otros ingredientes cocinada a la plancha. Elegid el puesto o restaurante al llegar y mirad su carta.',source:'https://www.japan.travel/en/spot/2207/',image:commonsImage(takoyakiPhoto),imageCredit:'ZhengZhou',imageLicense:'CC BY-SA 4.0',imagePage:commonsPage(takoyakiPhoto)},
  'Kushikatsu por Shinsekai':{title:'Kushikatsu',description:'Brochetas empanadas y fritas de verduras, carne o marisco. Es una opción informal para probar varias piezas y compartir.',also:'Mirad el precio por brocheta y las normas de la salsa de cada local antes de pedir.',source:'https://www.japan.travel/en/itineraries/osaka-from-north-to-south/'},
  'Cena en Hozenji Yokocho':{title:'Okonomiyaki',description:'El callejón reúne restaurantes pequeños. Si os apetece comida de Osaka, buscad okonomiyaki: una tortita salada de col hecha a la plancha.',also:'Es una sugerencia, no un plato garantizado en cada local; comprobad la carta antes de sentaros.',source:'https://www.osaka-info.jp/en/spot/hozenji-yokocho/'},
  'Nigiwai Ichiba, puerto de Katsuura':{title:'Atún de Katsuura',description:'La especialidad del puerto es el atún. Si hay puestos abiertos, preguntad por un donburi de atún: pescado servido sobre arroz.',also:'La oferta depende de la captura y del horario; no contéis con un puesto concreto sin comprobarlo.',source:'https://www.town.nachikatsuura.wakayama.jp/info/646'},
  'Restaurantes de atún en Kii-Katsuura':{title:'Atún de Katsuura',description:'Si preferís mesa, buscad un menú de atún local: sashimi, nigiri o un cuenco de arroz con atún según la carta del restaurante.',also:'Comprobad horario y menú del local elegido antes de decidir después de Nachi.',source:'https://nachikan.jp/restaurant/list/'},
  'Nishiki Market':{title:'Encurtidos de Kioto',description:'Nishiki invita a probar pequeños platos de temporada. Sus encurtidos de verduras son una especialidad local; la foto muestra distintos tipos en un puesto del propio mercado.',also:'Elegid lo que os apetezca ese día y comed junto al puesto, siguiendo sus indicaciones.',source:'https://www.japan.travel/en/spot/1174/'},
  'Cena en Gion':{title:'Yudofu',description:'Una opción tradicional para sentarse es el yudofu: tofu caliente con condimentos. Buscadlo en una carta de cocina de Kioto si os apetece una cena tranquila.',also:'Antes de entrar, revisad menú, precio y si hace falta reserva; no todos los restaurantes de Gion lo sirven.',source:'https://www.kyoto.travel/en/areas/gion-kiyomizu/'},
  'Puestos de Hida beef en el casco antiguo':{title:'Nigiri de ternera de Hida',description:'En el casco antiguo es popular el nigiri de ternera de Hida: una pequeña porción de carne sobre arroz, a menudo marcada con fuego.',also:'Es un bocado para probar la especialidad regional sin convertir la parada en una comida larga.',source:'https://www.japan.travel/en/gastronomy/article-hidas-miraculous-beef/',image:commonsImage(hidaPhoto),imageCredit:'Miyuki Meinaka',imageLicense:'CC BY-SA 4.0',imagePage:commonsPage(hidaPhoto)},
  'Kitchen Hida':{title:'Ternera de Hida',description:'La especialidad regional es la ternera de Hida. En una comida sentados podéis probarla en un corte preparado a la plancha o según la carta vigente.',also:'Confirmad el menú y el precio actual antes de reservar.',source:'https://www.japan.travel/en/gastronomy/article-hidas-miraculous-beef/'},
  'Comida tradicional en Asakusa':{title:'Tempura',description:'En Asakusa hay opciones clásicas para sentarse, como tempura: verduras o marisco con un rebozado ligero. Elegid según apetito, horario y presupuesto.',also:'No se garantiza que un restaurante concreto tenga este plato: consultad la carta al llegar.',source:'https://www.gotokyo.org/en/see-and-do/drinking-and-dining/index.html'},
  'Omoide Yokocho':{title:'Yakitori',description:'Los callejones son conocidos por sus barras pequeñas. Una opción típica son las brochetas de pollo a la parrilla, si figuran en la carta del local.',also:'Mirad aforo, precio y posibles cargos de mesa antes de pedir.',source:'https://www.gotokyo.org/en/spot/63/index.html'},
  'Manna, Shinjuku Nakamuraya':{title:'Curry de Nakamuraya',description:'Este establecimiento es conocido por su curry de inspiración india. La fotografía es una referencia visual del curry con arroz, no el plato exacto del restaurante.',also:'Confirmad la carta y el horario vigentes antes de ir.',source:'https://www.gotokyo.org/book/wp-content/uploads/2025/07/2507_shinjuku_mapguide_EN_low.pdf'},
};

// Photographs illustrate the dish, not necessarily the exact serving at each venue.
const foodIllustrations:Record<string,[string,string,string,string,string]>={
  dotonbori:['たこ焼き','Octopus balls',takoyakiPhoto,'ZhengZhou','CC BY-SA 4.0'],
  'Kushikatsu por Shinsekai':['串カツ','Deep-fried skewers','Kushikatsu (3603151166).jpg','chrisada','CC BY 2.0'],
  'Cena en Hozenji Yokocho':['お好み焼き','Savoury pancake','Okonomiyaki_in_Osaka.JPG','Zheng Zhou','CC BY-SA 4.0'],
  'Nigiwai Ichiba, puerto de Katsuura':['まぐろ丼','Tuna rice bowl','Maguro-don.jpg','Kanko','CC BY 2.0'],
  'Restaurantes de atún en Kii-Katsuura':['まぐろ丼','Tuna rice bowl','Maguro-don.jpg','Kanko','CC BY 2.0'],
  'Nishiki Market':['京漬物','Kyoto pickles','Nukazuke storefront by wilbanks in Nishiki-ichiba, Kyoto.jpg','wilbanks','CC BY-SA 2.0'],
  'Cena en Gion':['湯豆腐','Hot tofu','Yudofu meal set in Kyoto.jpg','ZhengZhou','CC BY-SA 4.0'],
  'Puestos de Hida beef en el casco antiguo':['飛騨牛にぎり','Hida beef sushi',hidaPhoto,'Miyuki Meinaka','CC BY-SA 4.0'],
  'Kitchen Hida':['飛騨牛','Hida beef','Grilling Hida Beef (Takayama Street Food) (35910429046).jpg','bryan...','CC BY 2.0'],
  'Comida tradicional en Asakusa':['天ぷら','Tempura','Tempura served with salt in Kyoto.jpg','ZhengZhou','CC BY-SA 4.0'],
  'Omoide Yokocho':['焼き鳥','Grilled chicken skewers','Yakitoriplate2011jan.jpg','Nesnad','CC BY 3.0'],
  'Manna, Shinjuku Nakamuraya':['インドカリー','Indian curry','Japanese curry rice 1 2021-11-28.jpeg','FASTILY','CC BY-SA 4.0'],
  'Mochi de Nara':['よもぎ餅','Mugwort mochi','Yomogi mochi.JPG','Midori','CC BY-SA 3.0'],
  'Somen de Nara':['三輪そうめん','Miwa somen','Miwa somen 01.jpg','ちぃこ','CC BY 2.1 JP'],
  'Dulce de Asakusa':['人形焼','Ningyo-yaki','Ningho-Yaki.JPG','Shoestring','Dominio público'],
  'Ramen de Tokio':['ラーメン','Ramen','Bowl of ramen.jpg','Douglas Perkins','CC BY 4.0'],
  'Atún de Kuromon':['まぐろ丼','Tuna rice bowl','Maguro-don.jpg','Kanko','CC BY 2.0'],
  'Cena en Pontocho':['湯豆腐','Hot tofu','Yudofu meal set in Kyoto.jpg','ZhengZhou','CC BY-SA 4.0'],
  'Pescado local guisado':['煮魚','Simmered fish','Umitanago Nitsuke.jpg','Totti','CC BY-SA 4.0'],
  'Soba y pescado en Kii-Katsuura':['ざるそば','Cold soba noodles','ZaruSoba.jpg','Chris 73','CC BY-SA 3.0'],
};
Object.assign(foodNotes,{
  'Mochi de Nara':{title:'Yomogi mochi',description:'Dulce de arroz con artemisa japonesa, que le da el color verde. Preguntad por él en Nakatanidō y comprobad el precio del día.',source:'https://www.visitnara.jp/venues/S01048/'},
  'Somen de Nara':{title:'Miwa somen',description:'Fideos finos tradicionales de la prefectura de Nara. Son una sugerencia para comer sentados si aparecen en la carta del local elegido.',source:'https://visitnara.jp/eat-and-drink/'},
  'Dulce de Asakusa':{title:'Ningyo-yaki',description:'Bizcochitos con formas tradicionales, normalmente rellenos de pasta dulce de judía. Buscadlos en Nakamise si os apetece un bocado típico.',source:'https://www.gotokyo.org/en/destinations/eastern-tokyo/asakusa/'},
  'Ramen de Tokio':{title:'Ramen',description:'Un cuenco de fideos en caldo es una opción para una cena informal cerca de Tokyo Station. La foto es orientativa; elegid local y tipo de caldo allí.',source:'https://www.gotokyo.org/en/destinations/central-tokyo/tokyo-station-and-marunouchi/index.html'},
  'Atún de Kuromon':{title:'Cuenco de atún',description:'En el mercado de Kuromon podéis buscar pescado preparado al momento. Este cuenco de atún es una opción visual; comprobad qué ofrece cada puesto y su precio.',source:'https://www.osaka-info.jp/en/spot/gastronomy-kuromon/'},
  'Cena en Pontocho':{title:'Yudofu',description:'Si os apetece cocina de Kioto, el tofu caliente es una opción tradicional. La fotografía muestra cómo puede presentarse, pero comprobad si figura en la carta del restaurante elegido.',source:'https://kyoto.travel/en/food-and-drink/'},
  'Pescado local guisado':{title:'Pescado guisado',description:'Nitsuke es pescado cocinado en salsa a base de soja. La oficina turística incluye pescado local guisado entre las opciones de Kii-Katsuura. La foto muestra este tipo de plato, no la pesca concreta del día.',source:'https://nachikan.jp/en/restaurant/4247/'},
  'Soba y pescado en Kii-Katsuura':{title:'Soba',description:'Los fideos de trigo sarraceno son otra posibilidad para sentarse a comer. En Kii-Katsuura hay restaurantes que los sirven solos o junto con platos de pescado; mirad la carta antes de elegir.',source:'https://nachikan.jp/en/restaurant/'},
});
for(const [key,[japanese,english,file,imageCredit,imageLicense]] of Object.entries(foodIllustrations)){
  const note=foodNotes[key];
  if(!note)continue;
  Object.assign(note,{japanese,english,image:commonsImage(file),imageCredit,imageLicense,imagePage:commonsPage(file)});
}

// These day-level suggestions point to a concrete dish; generic meals have no fixed menu.
export const foodTipNotes:Record<string,string>={
  'kuromon-food':'Atún de Kuromon',
  'dotonbori-dinner':'dotonbori',
  'katsuura-seafood':'Pescado local guisado',
  'nigiwai-tuna':'Nigiwai Ichiba, puerto de Katsuura',
  'nishiki-tasting':'Nishiki Market',
  'pontocho-dinner':'Cena en Pontocho',
  'nara-mochi':'Mochi de Nara',
  'nara-lunch':'Somen de Nara',
  'hida-beef':'Puestos de Hida beef en el casco antiguo',
  'marunouchi-dining':'Ramen de Tokio',
  'asakusa-snacks':'Dulce de Asakusa',
  'asakusa-dinner':'Comida tradicional en Asakusa',
  'omoide-yokocho':'Omoide Yokocho',
};

