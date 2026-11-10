export type Suggestion={kind:'Rincón local'|'Comida informal'|'Para sentarse';title:string;detail:string;map:string;source:string};
const map=(query:string)=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
export const localSuggestions:Record<string,Suggestion[]>={
  '14':[
    {kind:'Rincón local',title:'Tenma y Tenjinbashisuji',detail:'Calles comerciales y pequeños locales con ambiente cotidiano. Es un desvío opcional, no una parada obligatoria de la jornada.',map:map('Tenma Tenjinbashisuji Osaka'),source:'https://www.japan.travel/en/spot/2344/'},
    {kind:'Comida informal',title:'Kushikatsu por Shinsekai',detail:'Una opción de barra y pinchos si os apetece callejear. Elegid un local al llegar y comprobad horario y precio.',map:map('Shinsekai kushikatsu Osaka'),source:'https://www.japan.travel/en/itineraries/osaka-from-north-to-south/'},
    {kind:'Para sentarse',title:'Cena en Hozenji Yokocho',detail:'Callejón de Namba con restaurantes tradicionales y mesas para una cena con calma. Elegid local según carta y disponibilidad.',map:map('Hozenji Yokocho Osaka restaurants'),source:'https://www.osaka-info.jp/en/spot/hozenji-yokocho/'},
  ],
  '16':[
    {kind:'Comida informal',title:'Nigiwai Ichiba, puerto de Katsuura',detail:'Mercado con puestos de atún y productos locales. Conviene confirmar la hora de cierre antes de subir a Nachi.',map:map('Katsuura Port Nigiwai Market'),source:'https://www.town.nachikatsuura.wakayama.jp/info/646'},
    {kind:'Para sentarse',title:'Restaurantes de atún en Kii-Katsuura',detail:'La oficina turística publica un directorio de restaurantes locales. Elegid uno según el tiempo real de regreso y comprobad si admite mesa.',map:map('Kii-Katsuura tuna restaurant'),source:'https://nachikan.jp/restaurant/list/'},
  ],
  '18':[
    {kind:'Rincón local',title:'Calles de Fushimi',detail:'Zona histórica con identidad propia más allá de las visitas principales. Solo si queda una franja libre tras el recorrido previsto.',map:map('Fushimi sake district Kyoto'),source:'https://kyoto.travel/en/hidden-gems?article_categories%5B%5D=food_drink'},
    {kind:'Comida informal',title:'Nishiki Market',detail:'Probad algún bocado dentro del mercado; comed junto al puesto que lo vende y respetad sus indicaciones.',map:map('Nishiki Market Kyoto'),source:'https://www.japan.travel/en/spot/1174/'},
    {kind:'Para sentarse',title:'Cena en Gion',detail:'En el barrio hay restaurantes para una comida pausada. Consultad carta y reserva antes de añadir una cena a la jornada.',map:map('Gion Kyoto restaurants'),source:'https://www.kyoto.travel/en/areas/gion-kiyomizu/'},
  ],
  '21':[
    {kind:'Comida informal',title:'Puestos de Hida beef en el casco antiguo',detail:'Un bocado regional durante el paseo, sin convertirlo en una reserva fija.',map:map('Sanmachi Hida beef street food Takayama'),source:'https://www.japan.travel/en/gastronomy/article-hidas-miraculous-beef/'},
    {kind:'Para sentarse',title:'Kitchen Hida',detail:'Restaurante de ternera de Hida citado por la oficina nacional de turismo. Comprobad horario y disponibilidad antes de elegirlo.',map:map('Kitchen Hida Takayama'),source:'https://www.japan.travel/en/gastronomy/article-hidas-miraculous-beef/'},
  ],
  '23':[
    {kind:'Rincón local',title:'Calles laterales de Yanaka',detail:'Desvío breve a pie para disfrutar del barrio residencial ya incluido en la jornada, sin sumar un traslado.',map:map('Yanaka Ginza Tokyo'),source:'https://www.gotokyo.org/en/destinations/northern-tokyo/yanaka-and-nezu/index.html'},
    {kind:'Para sentarse',title:'Comida tradicional en Asakusa',detail:'Si preferís sentaros, buscad un restaurante de la zona y revisad carta y horario. Alternativa a picar mientras paseáis.',map:map('Asakusa traditional Japanese restaurants'),source:'https://www.gotokyo.org/en/see-and-do/drinking-and-dining/index.html'},
  ],
  '24':[
    {kind:'Comida informal',title:'Omoide Yokocho',detail:'Callejones de locales pequeños junto a Shinjuku; mirad el menú y el aforo antes de entrar.',map:map('Omoide Yokocho Shinjuku'),source:'https://www.gotokyo.org/en/spot/63/index.html'},
    {kind:'Para sentarse',title:'Manna, Shinjuku Nakamuraya',detail:'Restaurante citado por la guía oficial de Shinjuku; opción de mesa para una cena más tranquila. Comprobad horario vigente.',map:map('Shinjuku Nakamuraya Manna restaurant'),source:'https://www.gotokyo.org/book/wp-content/uploads/2025/07/2507_shinjuku_mapguide_EN_low.pdf'},
  ],
};
