/* Miraki Gardens — tablet menu data
   Languages: uz (O'zbekcha), ru (Русский), en (English)
   price: integer in so'm (used for cart math). img: file in images (optional). unit: portion size. */
window.MENU = {
  ui: {
    langs: [ {code:"uz",label:"O‘zbekcha"}, {code:"ru",label:"Русский"}, {code:"en",label:"English"} ],
    brandTagline: {
      uz: "Har bir maydon – yangilik, har bir daraxt – ilhom manbai!",
      ru: "Каждое поле — новизна, каждое дерево — источник вдохновения!",
      en: "Every field is novelty, every tree a source of inspiration!"
    },
    menu:     {uz:"Menyu", ru:"Меню", en:"Menu"},
    food:     {uz:"Taomlar", ru:"Кухня", en:"Food"},
    drinks:   {uz:"Ichimliklar", ru:"Напитки", en:"Drinks"},
    search:   {uz:"Qidirish...", ru:"Поиск...", en:"Search..."},
    add:      {uz:"Qo‘shish", ru:"Добавить", en:"Add"},
    cart:     {uz:"Savat", ru:"Корзина", en:"Cart"},
    cartEmpty:{uz:"Savat bo‘sh", ru:"Корзина пуста", en:"Your cart is empty"},
    cartHint: {uz:"Taomlarni tanlab, buyurtmangizni yig‘ing", ru:"Выберите блюда, чтобы собрать заказ", en:"Pick dishes to build your order"},
    subtotal: {uz:"Taomlar", ru:"Сумма", en:"Subtotal"},
    service:  {uz:"Xizmat haqi (10%)", ru:"Обслуживание (10%)", en:"Service charge (10%)"},
    total:    {uz:"Jami", ru:"Итого", en:"Total"},
    order:    {uz:"Ofitsiantni chaqirish", ru:"Позвать официанта", en:"Call the waiter"},
    orderNote:{uz:"Buyurtmani ofitsiantga ko‘rsating", ru:"Покажите заказ официанту", en:"Show this order to your waiter"},
    clear:    {uz:"Tozalash", ru:"Очистить", en:"Clear"},
    close:    {uz:"Yopish", ru:"Закрыть", en:"Close"},
    yourOrder:{uz:"Sizning buyurtmangiz", ru:"Ваш заказ", en:"Your order"},
    table:    {uz:"Stol raqami", ru:"Номер стола", en:"Table number"},
    som:      {uz:"so‘m", ru:"сум", en:"soum"},
    priceNote:{uz:"Narxlar QQS (12%) bilan. Buyurtmaga 10% xizmat haqi qo‘shiladi.",
               ru:"Цены с НДС (12%). К заказу добавляется 10% за обслуживание.",
               en:"Prices include VAT (12%). A 10% service charge is added to the order."},
    called:   {uz:"Ofitsiant chaqirildi", ru:"Официант вызван", en:"Waiter called"},
    calledMsg:{uz:"Buyurtmangiz tayyor. Ofitsiant tez orada keladi.", ru:"Ваш заказ готов. Официант скоро подойдёт.", en:"Your order is ready. A waiter will come shortly."}
  },

  categories: [
    // ===================== FOOD =====================
    { id:"cold", group:"food", icon:"🥗",
      name:{uz:"Sovuq gazaklar", ru:"Холодные закуски", en:"Cold Appetizers"},
      items:[
        {id:"suzma", img:"", unit:"200 gr", price:20000, name:{uz:"Suzma", ru:"Сузма", en:"Suzma (strained yogurt)"}, desc:{uz:"Maxsus ferma sutidan tayyorlangan", ru:"Из особого фермерского молока", en:"Made from special farm milk"}},
        {id:"achchiq", img:"4280", unit:"325 gr", price:40000, name:{uz:"Achchiq-chuchuk", ru:"Аччик-чучук", en:"Achchiq-chuchuk"}, desc:{uz:"Pomidor, bodring, ko‘katlar", ru:"Помидор, огурец, зелень", en:"Tomato, cucumber, herbs"}},
        {id:"burrata", img:"", unit:"300 gr", price:120000, name:{uz:"Burrata, miks salat bilan", ru:"Буррата с миксом салатов", en:"Burrata with mixed salad"}, desc:{uz:"Burrata siri, pomidor, salatlar", ru:"Сыр буррата, помидор, салаты", en:"Burrata cheese, tomato, greens"}},
        {id:"chiroqchi", img:"", unit:"460 gr", price:55000, name:{uz:"Chiroqchi milliy", ru:"Чирокчи (по-национальному)", en:"Chiroqchi (national)"}, desc:{uz:"Pomidor, suzma, ko‘katlar", ru:"Помидор, сузма, зелень", en:"Tomato, suzma, herbs"}},
        {id:"pishloqlar", img:"4320", unit:"330 gr", price:200000, name:{uz:"Pishloqlar assortisi", ru:"Ассорти сыров", en:"Cheese platter"}, desc:{uz:"Oliy darajadagi pishloqlar jamlanmasi", ru:"Набор сыров высшего сорта", en:"Selection of premium cheeses"}},
        {id:"goshtlar", img:"4304", unit:"445 gr", price:230000, name:{uz:"Go‘shtlar assortisi", ru:"Мясное ассорти", en:"Cold cuts platter"}, desc:{uz:"Mol, ot, kurka va tovuq go‘shti", ru:"Говядина, конина, индейка, курица", en:"Beef, horse, turkey, chicken"}},
        {id:"hummus", img:"", unit:"210 gr", price:45000, name:{uz:"Hummus", ru:"Хумус", en:"Hummus"}, desc:{uz:"No‘xat, taxina pastasi, limon, ziravorlar", ru:"Нут, паста тахини, лимон, специи", en:"Chickpeas, tahini, lemon, spices"}},
        {id:"babaganush", img:"", unit:"230 gr", price:40000, name:{uz:"Babaganush meze", ru:"Бабагануш", en:"Baba ganoush"}, desc:{uz:"Baqlajon, suzma, taxina pastasi", ru:"Баклажан, сузма, паста тахини", en:"Eggplant, suzma, tahini"}},
        {id:"sabzavotlar", img:"", unit:"450 gr", price:60000, name:{uz:"Sabzavotlar assortisi", ru:"Овощное ассорти", en:"Fresh vegetables platter"}, desc:{uz:"Mavsumiy sabzavotlar yig‘indisi", ru:"Набор сезонных овощей", en:"Seasonal vegetable selection"}},
        {id:"tuzlamalar", img:"4358", unit:"400 gr", price:55000, name:{uz:"Tuzlamalar assortisi", ru:"Ассорти солений", en:"Pickle platter"}, desc:{uz:"Pomidor, bodring, oq karam, anzur piyoz", ru:"Помидор, огурец, капуста, анзур", en:"Tomato, cucumber, cabbage, wild onion"}},
        {id:"seld", img:"4275", unit:"180 gr", price:60000, name:{uz:"Marinadlangan seld balig‘i", ru:"Маринованная сельдь", en:"Marinated herring"}, desc:{uz:"Seld balig‘i, kartoshka, piyoz, ko‘katlar", ru:"Сельдь, картофель, лук, зелень", en:"Herring, potato, onion, herbs"}}
      ]},

    { id:"hot", group:"food", icon:"🍤",
      name:{uz:"Issiq gazaklar", ru:"Горячие закуски", en:"Hot Appetizers"},
      items:[
        {id:"dolma", img:"4271", unit:"180 gr", price:55000, name:{uz:"Dolma", ru:"Долма", en:"Dolma"}, desc:{uz:"Tok bargi, mol go‘shti, guruch, ziravorlar", ru:"Виноградный лист, говядина, рис, специи", en:"Grape leaves, beef, rice, spices"}},
        {id:"krivetka_mix", img:"4273", unit:"250 gr", price:130000, name:{uz:"Qovurilgan krivetka miks salatli", ru:"Жареные креветки с салатом", en:"Fried shrimp with salad mix"}, desc:{uz:"Yo‘lbarssimon krivetka, salat miks, limon, saryog‘", ru:"Тигровые креветки, микс салат, лимон, масло", en:"Tiger shrimp, salad mix, lemon, butter"}},
        {id:"moltili_qaymoq", img:"4343", unit:"300 gr", price:100000, name:{uz:"Mol tili qaymoq sousli", ru:"Говяжий язык в сливочном соусе", en:"Beef tongue in cream sauce"}, desc:{uz:"Mol tili, qo‘ziqorin, qaymoq, ziravorlar", ru:"Говяжий язык, грибы, сливки, специи", en:"Beef tongue, mushrooms, cream, spices"}},
        {id:"krivetka_tempura", img:"", unit:"120 gr", price:130000, name:{uz:"“Qarsildoq” krivetka tempurali", ru:"Хрустящие креветки в темпуре", en:"Crispy shrimp tempura"}, desc:{uz:"Krivetka, ziravorlar, maxsus sous", ru:"Креветки, специи, специальный соус", en:"Shrimp, spices, special sauce"}},
        {id:"mol_filesi_hot", img:"4524", unit:"300 gr", price:120000, name:{uz:"Mol filesi", ru:"Говяжья вырезка", en:"Beef fillet"}, desc:{uz:"Mol filesi, qo‘ziqorin, qaymoqli sous", ru:"Говяжья вырезка, грибы, сливочный соус", en:"Beef fillet, mushrooms, cream sauce"}}
      ]},

    { id:"salads", group:"food", icon:"🥬",
      name:{uz:"Salatlar", ru:"Салаты", en:"Salads"},
      items:[
        {id:"grechskiy", img:"4223", unit:"280 gr", price:80000, name:{uz:"Grechskiy (Grek)", ru:"Греческий", en:"Greek salad"}, desc:{uz:"Feta pishlog‘i, bulg‘or qalampiri, pomidor, bodring", ru:"Сыр фета, болгарский перец, помидор, огурец", en:"Feta, bell pepper, tomato, cucumber"}},
        {id:"sezar_tovuq", img:"4244", unit:"300 gr", price:90000, name:{uz:"Sezar (tovuq fileli)", ru:"Цезарь с курицей", en:"Caesar with chicken"}, desc:{uz:"Ayzberg, pomidor, pishloq, qurutilgan non", ru:"Айсберг, помидор, сыр, сухарики", en:"Iceberg, tomato, cheese, croutons"}},
        {id:"sezar_steyk", img:"4229", unit:"300 gr", price:100000, name:{uz:"Sezar (steykli)", ru:"Цезарь со стейком", en:"Caesar with steak"}, desc:{uz:"Ayzberg, mol go‘shti, pishloq, qurutilgan non", ru:"Айсберг, говядина, сыр, сухарики", en:"Iceberg, beef, cheese, croutons"}},
        {id:"sezar_krivetka", img:"4231", unit:"300 gr", price:120000, name:{uz:"Sezar (krivetkali)", ru:"Цезарь с креветками", en:"Caesar with shrimp"}, desc:{uz:"Ayzberg, krivetka, pishloq, qurutilgan non", ru:"Айсберг, креветки, сыр, сухарики", en:"Iceberg, shrimp, cheese, croutons"}},
        {id:"podvodochka", img:"4262", unit:"280 gr", price:60000, name:{uz:"Salat “Podvodochka”", ru:"Салат «Подводочка»", en:"“Podvodochka” salad"}, desc:{uz:"Mol go‘shti, qo‘ziqorin, tuzlangan bodring, piyoz", ru:"Говядина, грибы, солёный огурец, лук", en:"Beef, mushrooms, pickled cucumber, onion"}},
        {id:"steyk_avokado", img:"4256", unit:"280 gr", price:130000, name:{uz:"Steyk salat avokado bilan", ru:"Салат со стейком и авокадо", en:"Steak & avocado salad"}, desc:{uz:"Mol go‘shti, salat miks, avokado, maxsus sous", ru:"Говядина, микс салат, авокадо, соус", en:"Beef, salad mix, avocado, special sauce"}},
        {id:"qarsildoq_baqlajon", img:"4284", unit:"320 gr", price:60000, name:{uz:"Qarsildoq baqlajon", ru:"Хрустящий баклажан", en:"Crispy eggplant"}, desc:{uz:"Baqlajon, pishloq, ko‘katlar, maxsus sous", ru:"Баклажан, сыр, зелень, соус", en:"Eggplant, cheese, herbs, special sauce"}},
        {id:"miraki_salat", img:"4247", unit:"330 gr", price:70000, name:{uz:"Salat “Miraki Gardens”", ru:"Салат «Miraki Gardens»", en:"“Miraki Gardens” salad"}, desc:{uz:"Marinadlangan lavlagi, apelsin, pishloq, salat miks", ru:"Маринованная свёкла, апельсин, сыр, микс салат", en:"Marinated beetroot, orange, cheese, salad mix"}},
        {id:"yaponskiy", img:"", unit:"365 gr", price:70000, name:{uz:"Yaponskiy", ru:"Японский", en:"Japanese salad"}, desc:{uz:"Mol go‘shti, pomidor, bodring, bulg‘or qalampiri", ru:"Говядина, помидор, огурец, болгарский перец", en:"Beef, tomato, cucumber, bell pepper"}},
        {id:"emirat", img:"4300", unit:"250 gr", price:70000, name:{uz:"Salat “Emirat”", ru:"Салат «Эмират»", en:"“Emirat” salad"}, desc:{uz:"Ananas, tovuq filesi, tuxum, jo‘xori, mayonez", ru:"Ананас, куриное филе, яйцо, кукуруза, майонез", en:"Pineapple, chicken, egg, corn, mayo"}},
        {id:"olivye", img:"", unit:"300 gr", price:65000, name:{uz:"Olivye", ru:"Оливье", en:"Olivier salad"}, desc:{uz:"Mol go‘shti, kartoshka, sabzi, tuxum, bodring, mayonez", ru:"Говядина, картофель, морковь, яйцо, огурец, майонез", en:"Beef, potato, carrot, egg, cucumber, mayo"}},
        {id:"mujskoy", img:"4288", unit:"260 gr", price:90000, name:{uz:"Mujskoy kapriz", ru:"Мужской каприз", en:"“Man's Caprice” salad"}, desc:{uz:"Mol tili, kurka go‘shti, dudlangan kolbasa, bodring", ru:"Говяжий язык, индейка, копчёная колбаса, огурец", en:"Beef tongue, turkey, smoked sausage, cucumber"}}
      ]},

    { id:"soups", group:"food", icon:"🍲",
      name:{uz:"1-taomlar (sho‘rvalar)", ru:"Первые блюда", en:"Soups"},
      items:[
        {id:"qaynatma", img:"4365", unit:"500 gr", price:65000, name:{uz:"Qaynatma sho‘rva", ru:"Кайнатма шурва", en:"Qaynatma shurva"}, desc:{uz:"Mol go‘shti, piyoz, sabzi, kartoshka, no‘xat", ru:"Говядина, лук, морковь, картофель, нут", en:"Beef, onion, carrot, potato, chickpeas"}},
        {id:"mastava", img:"4372", unit:"380 gr", price:60000, name:{uz:"Mastava milliycha", ru:"Мастава по-национальному", en:"Mastava (national)"}, desc:{uz:"Mol go‘shti, piyoz, sabzi, kartoshka, guruch", ru:"Говядина, лук, морковь, картофель, рис", en:"Beef, onion, carrot, potato, rice"}},
        {id:"unoshi", img:"", unit:"400 gr", price:60000, name:{uz:"Un oshi", ru:"Угра (унаши)", en:"Un oshi (noodle soup)"}, desc:{uz:"Mol go‘shti, piyoz, sabzi, bulg‘or qalampiri", ru:"Говядина, лук, морковь, болгарский перец", en:"Beef, onion, carrot, bell pepper"}},
        {id:"chechevitsa", img:"4340", unit:"350 gr", price:50000, name:{uz:"Chechevitsali krem sho‘rva", ru:"Крем-суп из чечевицы", en:"Lentil cream soup"}, desc:{uz:"Chechevitsa, piyoz, sabzi, limon soki", ru:"Чечевица, лук, морковь, лимонный сок", en:"Lentils, onion, carrot, lemon juice"}},
        {id:"salyanka", img:"4411", unit:"350 gr", price:65000, name:{uz:"“Salyanka”", ru:"Солянка", en:"Solyanka"}, desc:{uz:"Go‘sht, dudlangan kolbasa, bodring", ru:"Мясо, копчёная колбаса, огурец", en:"Meat, smoked sausage, pickles"}}
      ]},

    { id:"mains", group:"food", icon:"🍖",
      name:{uz:"2-taomlar", ru:"Вторые блюда", en:"Main Courses"},
      items:[
        {id:"qozon_mol", img:"4507", unit:"400 gr", price:200000, name:{uz:"Qozon kabob mol go‘shtidan", ru:"Казан-кабоб из говядины", en:"Kazan kebab (beef)"}, desc:{uz:"Mol go‘shti, kartoshka, piyoz", ru:"Говядина, картофель, лук", en:"Beef, potato, onion"}},
        {id:"qozon_qoy", img:"4479", unit:"400 gr", price:220000, name:{uz:"Qozon kabob qo‘y go‘shtidan", ru:"Казан-кабоб из баранины", en:"Kazan kebab (lamb)"}, desc:{uz:"Qo‘y go‘shti, kartoshka, piyoz", ru:"Баранина, картофель, лук", en:"Lamb, potato, onion"}},
        {id:"vaguri_350", img:"", unit:"350 gr", price:170000, name:{uz:"Vaguri qo‘y go‘shtidan (350 g)", ru:"Вагури из баранины (350 г)", en:"Vaguri lamb (350 g)"}, desc:{uz:"Qo‘y go‘shti", ru:"Баранина", en:"Lamb"}},
        {id:"vaguri_500", img:"", unit:"500 gr", price:240000, name:{uz:"Vaguri qo‘y go‘shtidan (500 g)", ru:"Вагури из баранины (500 г)", en:"Vaguri lamb (500 g)"}, desc:{uz:"Qo‘y go‘shti", ru:"Баранина", en:"Lamb"}},
        {id:"vaguri_1kg", img:"", unit:"1 kg", price:320000, name:{uz:"Vaguri qo‘y go‘shtidan (1 kg)", ru:"Вагури из баранины (1 кг)", en:"Vaguri lamb (1 kg)"}, desc:{uz:"Qo‘y go‘shti", ru:"Баранина", en:"Lamb"}},
        {id:"tabaka", img:"4484", unit:"400 gr", price:110000, name:{uz:"Tabaka saryog‘ bilan", ru:"Табака с маслом", en:"Chicken tabaka with butter"}, desc:{uz:"Tovuq go‘shti, saryog‘, chesnok, sous", ru:"Курица, масло, чеснок, соус", en:"Chicken, butter, garlic, sauce"}},
        {id:"qoy_qovurga", img:"4518", unit:"280 gr", price:180000, name:{uz:"Qo‘y qovurg‘asi", ru:"Бараньи рёбра", en:"Lamb ribs"}, desc:{uz:"Qo‘y qovurg‘asi, qovurdoq kartoshka", ru:"Бараньи рёбра, жареный картофель", en:"Lamb ribs, roasted potato"}},
        {id:"mol_qovurga", img:"4528", unit:"350 gr", price:190000, name:{uz:"Mol qovurg‘asi guruch bilan", ru:"Говяжьи рёбра с рисом", en:"Beef ribs with rice"}, desc:{uz:"Mol qovurg‘asi, dimlangan guruch", ru:"Говяжьи рёбра, пропаренный рис", en:"Beef ribs, steamed rice"}},
        {id:"manti", img:"4505", unit:"75 gr", price:20000, name:{uz:"Manti uyg‘urcha (1 dona)", ru:"Манты по-уйгурски (1 шт)", en:"Uyghur manti (1 pc)"}, desc:{uz:"Mol go‘shti, piyoz, mol yog‘i, un", ru:"Говядина, лук, жир, тесто", en:"Beef, onion, fat, dough"}},
        {id:"tovuq_say", img:"4496", unit:"550 gr", price:110000, name:{uz:"Tovuq say", ru:"Курица сай", en:"Chicken sai (stir-fry)"}, desc:{uz:"Tovuq go‘shti, piyoz, bulg‘or qalampiri, pomidor", ru:"Курица, лук, болгарский перец, помидор", en:"Chicken, onion, bell pepper, tomato"}},
        {id:"gosht_say", img:"4442", unit:"550 gr", price:150000, name:{uz:"Go‘sht say", ru:"Мясо сай", en:"Beef sai (stir-fry)"}, desc:{uz:"Mol go‘shti, piyoz, bulg‘or qalampiri, pomidor", ru:"Говядина, лук, болгарский перец, помидор", en:"Beef, onion, bell pepper, tomato"}},
        {id:"dudlangan_tovuq", img:"", unit:"250 gr", price:100000, name:{uz:"Dudlangan tovuq filesi", ru:"Копчёное куриное филе", en:"Smoked chicken fillet"}, desc:{uz:"Tovuq filesi, sabzavotlar, sous", ru:"Куриное филе, овощи, соус", en:"Chicken fillet, vegetables, sauce"}},
        {id:"tuy_kabob", img:"4534", unit:"450 gr", price:180000, name:{uz:"Tuy kabob mol go‘shtli", ru:"Той-кабоб из говядины", en:"Tuy kebab (beef)"}, desc:{uz:"Mol go‘shti, piyoz, ziravorlar, pomidor", ru:"Говядина, лук, специи, помидор", en:"Beef, onion, spices, tomato"}},
        {id:"tushonka_mol", img:"4509", unit:"350 gr", price:180000, name:{uz:"Tushonka mol go‘shtli", ru:"Тушёнка из говядины", en:"Beef stew (tushonka)"}, desc:{uz:"Mol go‘shti, piyoz, ziravorlar", ru:"Говядина, лук, специи", en:"Beef, onion, spices"}},
        {id:"tushonka_tili", img:"", unit:"350 gr", price:200000, name:{uz:"Tushonka mol tili bilan", ru:"Тушёнка с говяжьим языком", en:"Stew with beef tongue"}, desc:{uz:"Mol tili, piyoz, ziravorlar", ru:"Говяжий язык, лук, специи", en:"Beef tongue, onion, spices"}},
        {id:"qurtob_1", img:"", unit:"750 gr", price:180000, name:{uz:"Qurtob (1 porsiya)", ru:"Куртоб (1 порция)", en:"Qurtob (full)"}, desc:{uz:"Mol go‘shti, patir, qurt, pomidor, bodring", ru:"Говядина, патир, курт, помидор, огурец", en:"Beef, patir bread, kurt, tomato, cucumber"}},
        {id:"qurtob_05", img:"", unit:"350 gr", price:100000, name:{uz:"Qurtob (0,5 porsiya)", ru:"Куртоб (0,5 порции)", en:"Qurtob (half)"}, desc:{uz:"Mol go‘shti, patir, qurt, pomidor, bodring", ru:"Говядина, патир, курт, помидор, огурец", en:"Beef, patir bread, kurt, tomato, cucumber"}}
      ]},

    { id:"pasta", group:"food", icon:"🍝",
      name:{uz:"Pastali taomlar", ru:"Паста", en:"Pasta"},
      items:[
        {id:"fetuchini_alfredo", img:"4570", unit:"350 gr", price:100000, name:{uz:"Fetuchini Alfredo", ru:"Фетучини Альфредо", en:"Fettuccine Alfredo"}, desc:{uz:"Fetuchini, tovuq go‘shti, qo‘ziqorin, qaymoq", ru:"Фетучини, курица, грибы, сливки", en:"Fettuccine, chicken, mushrooms, cream"}},
        {id:"fetuchini_krivetka", img:"", unit:"350 gr", price:140000, name:{uz:"Fetuchini Alfredo krivetkali", ru:"Фетучини Альфредо с креветками", en:"Fettuccine Alfredo with shrimp"}, desc:{uz:"Fetuchini, krivetka, pishloq, qaymoq", ru:"Фетучини, креветки, сыр, сливки", en:"Fettuccine, shrimp, cheese, cream"}},
        {id:"carbonara", img:"", unit:"350 gr", price:110000, name:{uz:"Spagetti Karbonara", ru:"Спагетти Карбонара", en:"Spaghetti Carbonara"}, desc:{uz:"Spagetti, tandir go‘shti, qaymoq, pishloq", ru:"Спагетти, тандырное мясо, сливки, сыр", en:"Spaghetti, tandoor meat, cream, cheese"}},
        {id:"frikadelki", img:"4578", unit:"350 gr", price:75000, name:{uz:"Spagetti Frikadelki", ru:"Спагетти с фрикадельками", en:"Spaghetti with meatballs"}, desc:{uz:"Spagetti, mol go‘shti, pishloq, maxsus sous", ru:"Спагетти, говядина, сыр, соус", en:"Spaghetti, beef, cheese, special sauce"}}
      ]},

    { id:"pizza", group:"food", icon:"🍕",
      name:{uz:"Pitsalar", ru:"Пицца", en:"Pizza"},
      items:[
        {id:"pepperoni", img:"4310", unit:"350 gr", price:98000, name:{uz:"Pitsa Pepperoni", ru:"Пицца Пепперони", en:"Pepperoni pizza"}, desc:{uz:"Kolbasa, maxsus sous, pishloq", ru:"Колбаса, соус, сыр", en:"Sausage, special sauce, cheese"}},
        {id:"margarita", img:"4444", unit:"360 gr", price:90000, name:{uz:"Pitsa Margarita", ru:"Пицца Маргарита", en:"Margherita pizza"}, desc:{uz:"Maxsus sous, pomidor, pishloq", ru:"Соус, помидор, сыр", en:"Sauce, tomato, cheese"}},
        {id:"pizza_sezar", img:"4466", unit:"400 gr", price:110000, name:{uz:"Pitsa Sezar sousli", ru:"Пицца Цезарь", en:"Caesar pizza"}, desc:{uz:"Tovuq go‘shti, maxsus sous, pomidor, pishloq", ru:"Курица, соус, помидор, сыр", en:"Chicken, sauce, tomato, cheese"}},
        {id:"pizza_4cheese", img:"4490", unit:"350 gr", price:110000, name:{uz:"Pitsa 4 xil pishloqli", ru:"Пицца 4 сыра", en:"Four-cheese pizza"}, desc:{uz:"4 xil premium tabiiy pishloq, maxsus sous", ru:"4 вида натурального сыра, соус", en:"Four premium cheeses, special sauce"}},
        {id:"pide_gosht", img:"4201", unit:"400 gr", price:110000, name:{uz:"Pide go‘shtli", ru:"Пиде с мясом", en:"Meat pide"}, desc:{uz:"Mol go‘shti, maxsus sous, pomidor, ko‘katlar", ru:"Говядина, соус, помидор, зелень", en:"Beef, special sauce, tomato, herbs"}},
        {id:"pide_pishloq", img:"", unit:"380 gr", price:110000, name:{uz:"Pide pishloqli", ru:"Пиде с сыром", en:"Cheese pide"}, desc:{uz:"Pishloq, maxsus sous, pomidor, ko‘katlar", ru:"Сыр, соус, помидор, зелень", en:"Cheese, special sauce, tomato, herbs"}}
      ]},

    { id:"sides", group:"food", icon:"🍟",
      name:{uz:"Garnirlar", ru:"Гарниры", en:"Sides"},
      items:[
        {id:"fri", img:"4297", unit:"160 gr", price:40000, name:{uz:"Kartoshka fri", ru:"Картофель фри", en:"French fries"}, desc:{uz:"", ru:"", en:""}},
        {id:"qovurilgan_kartoshka", img:"", unit:"160 gr", price:40000, name:{uz:"Qovurilgan kartoshka", ru:"Жареный картофель", en:"Roasted potatoes"}, desc:{uz:"", ru:"", en:""}},
        {id:"mini_kartoshka", img:"4554", unit:"200 gr", price:40000, name:{uz:"Mini kartoshka", ru:"Мини-картофель", en:"Baby potatoes"}, desc:{uz:"", ru:"", en:""}},
        {id:"grill_sabzavot", img:"4724", unit:"200 gr", price:40000, name:{uz:"Grill sabzavotlar", ru:"Овощи на гриле", en:"Grilled vegetables"}, desc:{uz:"", ru:"", en:""}},
        {id:"sabzavotli_guruch", img:"", unit:"180 gr", price:40000, name:{uz:"Sabzavotli guruch", ru:"Рис с овощами", en:"Vegetable rice"}, desc:{uz:"", ru:"", en:""}},
        {id:"buglangan_guruch", img:"4549", unit:"180 gr", price:40000, name:{uz:"Buglangan guruch", ru:"Рис на пару", en:"Steamed rice"}, desc:{uz:"", ru:"", en:""}}
      ]},

    { id:"grill", group:"food", icon:"🔥",
      name:{uz:"Mangal kaboblar", ru:"Мангал (шашлыки)", en:"Grill (Kebabs)"},
      items:[
        {id:"qiyma", img:"4714", unit:"135 gr", price:80000, name:{uz:"Qiyma", ru:"Кийма (рубленый)", en:"Minced kebab"}, desc:{uz:"", ru:"", en:""}},
        {id:"mol_bolakli", img:"4710", unit:"120 gr", price:90000, name:{uz:"Mol go‘shti bo‘lakli", ru:"Говядина кусковая", en:"Beef chunk kebab"}, desc:{uz:"", ru:"", en:""}},
        {id:"qoy_bolakli", img:"", unit:"120 gr", price:80000, name:{uz:"Qo‘y go‘shti bo‘lakli", ru:"Баранина кусковая", en:"Lamb chunk kebab"}, desc:{uz:"", ru:"", en:""}},
        {id:"tovuq_bolakli", img:"4704", unit:"120 gr", price:80000, name:{uz:"Tovuq go‘shti bo‘lakli", ru:"Курица кусковая", en:"Chicken chunk kebab"}, desc:{uz:"", ru:"", en:""}},
        {id:"tovuq_qanot", img:"4719", unit:"150 gr", price:90000, name:{uz:"Tovuq qanotchalari", ru:"Куриные крылышки", en:"Chicken wings"}, desc:{uz:"", ru:"", en:""}},
        {id:"rulet", img:"", unit:"120 gr", price:85000, name:{uz:"Rulet mol go‘shtidan", ru:"Рулет из говядины", en:"Beef roll"}, desc:{uz:"", ru:"", en:""}},
        {id:"napoleon", img:"", unit:"120 gr", price:90000, name:{uz:"Napoleon", ru:"Наполеон (кебаб)", en:"Napoleon kebab"}, desc:{uz:"", ru:"", en:""}},
        {id:"sabzavot_miks", img:"", unit:"150 gr", price:50000, name:{uz:"Sabzavotli miks", ru:"Овощной микс", en:"Grilled veg mix"}, desc:{uz:"", ru:"", en:""}},
        {id:"pomidor_grill", img:"", unit:"150 gr", price:40000, name:{uz:"Pomidor", ru:"Помидор гриль", en:"Grilled tomato"}, desc:{uz:"", ru:"", en:""}},
        {id:"non_kabob", img:"", unit:"100 gr", price:35000, name:{uz:"Non kabob", ru:"Лепёшка на мангале", en:"Grilled bread"}, desc:{uz:"", ru:"", en:""}}
      ]},

    { id:"sauces", group:"food", icon:"🥫",
      name:{uz:"Souslar", ru:"Соусы", en:"Sauces"},
      items:[
        {id:"yongoqli", img:"", unit:"50 gr", price:15000, name:{uz:"Yong‘oqli sous", ru:"Ореховый соус", en:"Walnut sauce"}, desc:{uz:"", ru:"", en:""}},
        {id:"sarimsoqli", img:"", unit:"50 gr", price:15000, name:{uz:"Sarimsoqli sous", ru:"Чесночный соус", en:"Garlic sauce"}, desc:{uz:"", ru:"", en:""}},
        {id:"tartar", img:"", unit:"50 gr", price:15000, name:{uz:"Tar-tar", ru:"Тартар", en:"Tartar sauce"}, desc:{uz:"", ru:"", en:""}},
        {id:"bbq", img:"", unit:"50 gr", price:15000, name:{uz:"BBQ sous", ru:"Соус BBQ", en:"BBQ sauce"}, desc:{uz:"", ru:"", en:""}},
        {id:"ketchup", img:"", unit:"50 gr", price:15000, name:{uz:"Ketchup", ru:"Кетчуп", en:"Ketchup"}, desc:{uz:"", ru:"", en:""}},
        {id:"mayonez", img:"", unit:"50 gr", price:15000, name:{uz:"Mayonez", ru:"Майонез", en:"Mayonnaise"}, desc:{uz:"", ru:"", en:""}},
        {id:"chimichurri", img:"", unit:"50 gr", price:15000, name:{uz:"Chimichurri", ru:"Чимичурри", en:"Chimichurri"}, desc:{uz:"", ru:"", en:""}},
        {id:"gorchitsa", img:"", unit:"50 gr", price:15000, name:{uz:"Gorchitsali sous", ru:"Горчичный соус", en:"Mustard sauce"}, desc:{uz:"", ru:"", en:""}},
        {id:"zaytun", img:"", unit:"30 gr", price:15000, name:{uz:"Zaytun yog‘i", ru:"Оливковое масло", en:"Olive oil"}, desc:{uz:"", ru:"", en:""}}
      ]},

    { id:"extras", group:"food", icon:"➕",
      name:{uz:"Qo‘shimchalar", ru:"Дополнения", en:"Extras"},
      items:[
        {id:"limon", img:"", unit:"30 gr", price:15000, name:{uz:"Limon", ru:"Лимон", en:"Lemon"}, desc:{uz:"", ru:"", en:""}},
        {id:"asal", img:"", unit:"50 gr", price:20000, name:{uz:"Asal", ru:"Мёд", en:"Honey"}, desc:{uz:"", ru:"", en:""}},
        {id:"zaytun_dona", img:"", unit:"50 gr", price:20000, name:{uz:"Zaytun", ru:"Оливки", en:"Olives"}, desc:{uz:"", ru:"", en:""}},
        {id:"qalampir", img:"", unit:"30 gr", price:10000, name:{uz:"Qalampir mavsumli", ru:"Перец сезонный", en:"Seasonal pepper"}, desc:{uz:"", ru:"", en:""}},
        {id:"saryog", img:"", unit:"50 gr", price:10000, name:{uz:"Saryog‘", ru:"Сливочное масло", en:"Butter"}, desc:{uz:"", ru:"", en:""}}
      ]},

    { id:"bread", group:"food", icon:"🍞",
      name:{uz:"Nonlar", ru:"Хлеб", en:"Bread"},
      items:[
        {id:"non_savati", img:"4353", unit:"130 gr", price:40000, name:{uz:"Non savati", ru:"Хлебная корзина", en:"Bread basket"}, desc:{uz:"", ru:"", en:""}},
        {id:"kulcha", img:"", unit:"90 gr", price:10000, name:{uz:"Kulcha", ru:"Кульча", en:"Kulcha"}, desc:{uz:"", ru:"", en:""}},
        {id:"mini_patir", img:"", unit:"20 gr", price:10000, name:{uz:"Mini patir", ru:"Мини-патир", en:"Mini patir"}, desc:{uz:"", ru:"", en:""}},
        {id:"grissini", img:"", unit:"70 gr", price:10000, name:{uz:"Grissini", ru:"Гриссини", en:"Grissini"}, desc:{uz:"", ru:"", en:""}},
        {id:"baget", img:"", unit:"70 gr", price:10000, name:{uz:"Baget", ru:"Багет", en:"Baguette"}, desc:{uz:"", ru:"", en:""}},
        {id:"chebatta", img:"", unit:"90 gr", price:10000, name:{uz:"Chebatta", ru:"Чиабатта", en:"Ciabatta"}, desc:{uz:"", ru:"", en:""}}
      ]},

    { id:"kids", group:"food", icon:"🧒",
      name:{uz:"Bolalar menusi", ru:"Детское меню", en:"Kids Menu"},
      items:[
        {id:"klab", img:"4475", unit:"400 gr", price:110000, name:{uz:"Klab sendvich", ru:"Клаб-сэндвич", en:"Club sandwich"}, desc:{uz:"Tost noni, tovuq, qovurilgan tuxum, pomidor, fri", ru:"Тост, курица, яйцо, помидор, фри", en:"Toast, chicken, fried egg, tomato, fries"}},
        {id:"klab_pishloq", img:"", unit:"420 gr", price:110000, name:{uz:"Pishloqli klab sendvich", ru:"Клаб-сэндвич с сыром", en:"Cheese club sandwich"}, desc:{uz:"Tost noni, tovuq, chedder, pomidor, fri", ru:"Тост, курица, чеддер, помидор, фри", en:"Toast, chicken, cheddar, tomato, fries"}},
        {id:"burger_mol", img:"4455", unit:"330 gr", price:60000, name:{uz:"Mini burger mol go‘shtli", ru:"Мини-бургер с говядиной", en:"Mini beef burger"}, desc:{uz:"Mol go‘shti, pishloq, sous, pomidor, ayzberg", ru:"Говядина, сыр, соус, помидор, айсберг", en:"Beef, cheese, sauce, tomato, iceberg"}},
        {id:"burger_tovuq", img:"", unit:"330 gr", price:50000, name:{uz:"Mini burger tovuq go‘shtli", ru:"Мини-бургер с курицей", en:"Mini chicken burger"}, desc:{uz:"Tovuq, pishloq, sous, pomidor, ayzberg", ru:"Курица, сыр, соус, помидор, айсберг", en:"Chicken, cheese, sauce, tomato, iceberg"}},
        {id:"nuggets", img:"", unit:"200 gr", price:40000, name:{uz:"Qovurilgan tovuq go‘shti", ru:"Куриные наггетсы", en:"Fried chicken"}, desc:{uz:"Tovuq go‘shti, kartoshka fri", ru:"Курица, картофель фри", en:"Chicken, french fries"}},
        {id:"qalamchalar", img:"4449", unit:"200 gr", price:40000, name:{uz:"Pishloqli qalamchalar", ru:"Сырные палочки", en:"Cheese sticks"}, desc:{uz:"Motsarella, murabbo, tuxum, panko", ru:"Моцарелла, джем, яйцо, панко", en:"Mozzarella, jam, egg, panko"}}
      ]},

    { id:"desserts", group:"food", icon:"🍰",
      name:{uz:"Desertlar", ru:"Десерты", en:"Desserts"},
      items:[
        {id:"cheesecake", img:"4334", unit:"190 gr", price:50000, name:{uz:"Cheesecake “San Sebastian”", ru:"Чизкейк «Сан-Себастьян»", en:"“San Sebastian” cheesecake"}, desc:{uz:"", ru:"", en:""}},
        {id:"cheesecake_rezavor", img:"4327", unit:"190 gr", price:50000, name:{uz:"“San Sebastian” rezavor sousli", ru:"«Сан-Себастьян» с ягодным соусом", en:"“San Sebastian” with berry sauce"}, desc:{uz:"", ru:"", en:""}},
        {id:"cheesecake_pista", img:"4331", unit:"190 gr", price:50000, name:{uz:"“San Sebastian” pista sousli", ru:"«Сан-Себастьян» с фисташковым соусом", en:"“San Sebastian” with pistachio sauce"}, desc:{uz:"", ru:"", en:""}},
        {id:"fondan", img:"4349", unit:"100 gr", price:50000, name:{uz:"Shokolad fondan", ru:"Шоколадный фондан", en:"Chocolate fondant"}, desc:{uz:"", ru:"", en:""}},
        {id:"meva_katta", img:"", unit:"700 gr", price:150000, name:{uz:"Meva assortisi (katta)", ru:"Фруктовое ассорти (большое)", en:"Fruit platter (large)"}, desc:{uz:"", ru:"", en:""}},
        {id:"meva_kichik", img:"", unit:"400 gr", price:100000, name:{uz:"Meva assortisi (kichik)", ru:"Фруктовое ассорти (малое)", en:"Fruit platter (small)"}, desc:{uz:"", ru:"", en:""}},
        {id:"muz_shokolad", img:"", unit:"80 gr", price:55000, name:{uz:"Muzqaymoq shokoladli", ru:"Мороженое шоколадное", en:"Chocolate ice cream"}, desc:{uz:"", ru:"", en:""}},
        {id:"muz_pista", img:"", unit:"80 gr", price:55000, name:{uz:"Muzqaymoq pistali", ru:"Мороженое фисташковое", en:"Pistachio ice cream"}, desc:{uz:"", ru:"", en:""}},
        {id:"muz_plombir", img:"", unit:"80 gr", price:55000, name:{uz:"Muzqaymoq plombir", ru:"Мороженое пломбир", en:"Plombir ice cream"}, desc:{uz:"", ru:"", en:""}}
      ]},

    // ===================== DRINKS =====================
    { id:"cocktails", group:"drinks", icon:"🍸",
      name:{uz:"Kokteyllar", ru:"Коктейли", en:"Cocktails"},
      items:[
        {id:"bloody_mary", img:"", unit:"200 ml", price:85000, name:{uz:"Bloody Mary", ru:"Кровавая Мэри", en:"Bloody Mary"}, desc:{uz:"",ru:"",en:""}},
        {id:"mojito", img:"", unit:"280 ml", price:90000, name:{uz:"Mohito", ru:"Мохито", en:"Mojito"}, desc:{uz:"",ru:"",en:""}},
        {id:"aperol", img:"", unit:"230 ml", price:95000, name:{uz:"Aperol Spritz", ru:"Апероль Шприц", en:"Aperol Spritz"}, desc:{uz:"",ru:"",en:""}},
        {id:"moscow_mule", img:"", unit:"230 ml", price:95000, name:{uz:"Moscow Mule", ru:"Московский мул", en:"Moscow Mule"}, desc:{uz:"",ru:"",en:""}},
        {id:"whiskey_sour", img:"", unit:"125 ml", price:110000, name:{uz:"Whiskey Sour", ru:"Виски Сауэр", en:"Whiskey Sour"}, desc:{uz:"",ru:"",en:""}},
        {id:"negroni", img:"", unit:"230 ml", price:110000, name:{uz:"Negroni", ru:"Негрони", en:"Negroni"}, desc:{uz:"",ru:"",en:""}},
        {id:"margarita_c", img:"", unit:"230 ml", price:140000, name:{uz:"Margarita", ru:"Маргарита", en:"Margarita"}, desc:{uz:"",ru:"",en:""}}
      ]},

    { id:"beer", group:"drinks", icon:"🍺",
      name:{uz:"Pivo", ru:"Пиво", en:"Beer"},
      items:[
        {id:"sarbast_orig", img:"", unit:"450 ml", price:40000, name:{uz:"Sarbast Original", ru:"Сарбаст Original", en:"Sarbast Original"}, desc:{uz:"",ru:"",en:""}},
        {id:"sarbast_unf", img:"", unit:"450 ml", price:40000, name:{uz:"Sarbast Unfiltered", ru:"Сарбаст нефильтрованное", en:"Sarbast Unfiltered"}, desc:{uz:"",ru:"",en:""}},
        {id:"carlsberg", img:"", unit:"450 ml", price:45000, name:{uz:"Carlsberg", ru:"Carlsberg", en:"Carlsberg"}, desc:{uz:"",ru:"",en:""}},
        {id:"heineken", img:"", unit:"330 ml", price:60000, name:{uz:"Heineken", ru:"Heineken", en:"Heineken"}, desc:{uz:"",ru:"",en:""}}
      ]},

    { id:"aperitifs", group:"drinks", icon:"🥃",
      name:{uz:"Aperitivlar", ru:"Аперитивы", en:"Apéritifs"},
      items:[
        {id:"martini", img:"", unit:"50 ml", price:50000, name:{uz:"Martini Rosso", ru:"Мартини Россо", en:"Martini Rosso"}, desc:{uz:"",ru:"",en:""}},
        {id:"aperol_ap", img:"", unit:"50 ml", price:70000, name:{uz:"Aperol", ru:"Апероль", en:"Aperol"}, desc:{uz:"",ru:"",en:""}}
      ]},

    { id:"spirits", group:"drinks", icon:"🍾",
      name:{uz:"Kuchli ichimliklar", ru:"Крепкий алкоголь", en:"Spirits"},
      items:[
        {id:"beefeater", img:"", unit:"50 ml", price:65000, name:{uz:"Beefeater's (Gin)", ru:"Beefeater's (Джин)", en:"Beefeater's (Gin)"}, desc:{uz:"",ru:"",en:""}},
        {id:"gordons", img:"", unit:"50 ml", price:80000, name:{uz:"Gordon's (Gin)", ru:"Gordon's (Джин)", en:"Gordon's (Gin)"}, desc:{uz:"",ru:"",en:""}},
        {id:"captain_morgan", img:"", unit:"50 ml", price:65000, name:{uz:"Captain Morgan (Rom)", ru:"Captain Morgan (Ром)", en:"Captain Morgan (Rum)"}, desc:{uz:"",ru:"",en:""}},
        {id:"jose_cuervo", img:"", unit:"50 ml", price:85000, name:{uz:"Jose Cuervo Silver (Tekila)", ru:"Jose Cuervo Silver (Текила)", en:"Jose Cuervo Silver (Tequila)"}, desc:{uz:"",ru:"",en:""}},
        {id:"stolichnaya", img:"", unit:"50 ml", price:40000, name:{uz:"Stolichnaya (Vodka)", ru:"Столичная (Водка)", en:"Stolichnaya (Vodka)"}, desc:{uz:"",ru:"",en:""}},
        {id:"absolut", img:"", unit:"50 ml", price:55000, name:{uz:"Absolut (Vodka)", ru:"Absolut (Водка)", en:"Absolut (Vodka)"}, desc:{uz:"",ru:"",en:""}},
        {id:"grey_goose", img:"", unit:"50 ml", price:110000, name:{uz:"Grey Goose (Vodka)", ru:"Grey Goose (Водка)", en:"Grey Goose (Vodka)"}, desc:{uz:"",ru:"",en:""}}
      ]},

    { id:"whiskey", group:"drinks", icon:"🥃",
      name:{uz:"Konyak va Viski", ru:"Коньяк и Виски", en:"Cognac & Whiskey"},
      items:[
        {id:"ozbekiston", img:"", unit:"50 ml", price:40000, name:{uz:"O‘zbekiston (Konyak)", ru:"Узбекистан (Коньяк)", en:"O‘zbekiston (Cognac)"}, desc:{uz:"",ru:"",en:""}},
        {id:"tambour5", img:"", unit:"50 ml", price:45000, name:{uz:"Tambour 5 (Konyak)", ru:"Tambour 5 (Коньяк)", en:"Tambour 5 (Cognac)"}, desc:{uz:"",ru:"",en:""}},
        {id:"hennessy", img:"", unit:"50 ml", price:170000, name:{uz:"Hennessy X.O", ru:"Hennessy X.O", en:"Hennessy X.O"}, desc:{uz:"",ru:"",en:""}},
        {id:"jameson", img:"", unit:"50 ml", price:65000, name:{uz:"Jameson (Irish)", ru:"Jameson (Ирландский)", en:"Jameson (Irish)"}, desc:{uz:"",ru:"",en:""}},
        {id:"wild_turkey", img:"", unit:"50 ml", price:70000, name:{uz:"Wild Turkey 101 (Bourbon)", ru:"Wild Turkey 101 (Бурбон)", en:"Wild Turkey 101 (Bourbon)"}, desc:{uz:"",ru:"",en:""}},
        {id:"johnnie", img:"", unit:"50 ml", price:75000, name:{uz:"Johnnie Walker Red", ru:"Johnnie Walker Red", en:"Johnnie Walker Red"}, desc:{uz:"",ru:"",en:""}},
        {id:"chivas", img:"", unit:"50 ml", price:130000, name:{uz:"Chivas Regal 12 y.o.", ru:"Chivas Regal 12 лет", en:"Chivas Regal 12 y.o."}, desc:{uz:"",ru:"",en:""}},
        {id:"macallan", img:"", unit:"50 ml", price:360000, name:{uz:"Macallan 12 y.o.", ru:"Macallan 12 лет", en:"Macallan 12 y.o."}, desc:{uz:"",ru:"",en:""}}
      ]},

    { id:"wine", group:"drinks", icon:"🍷",
      name:{uz:"Vinolar", ru:"Вино", en:"Wine"},
      items:[
        {id:"peri_chard_glass", img:"", unit:"150 ml", price:65000, name:{uz:"Peri Chardonnay (bokal)", ru:"Peri Chardonnay (бокал)", en:"Peri Chardonnay (glass)"}, desc:{uz:"Oq vino",ru:"Белое вино",en:"White wine"}},
        {id:"cab_glass", img:"", unit:"150 ml", price:65000, name:{uz:"Cabernet Sauvignon (bokal)", ru:"Cabernet Sauvignon (бокал)", en:"Cabernet Sauvignon (glass)"}, desc:{uz:"Qizil vino",ru:"Красное вино",en:"Red wine"}},
        {id:"peri_chard", img:"", unit:"750 ml", price:320000, name:{uz:"Peri Chardonnay", ru:"Peri Chardonnay", en:"Peri Chardonnay"}, desc:{uz:"Oq vino",ru:"Белое вино",en:"White wine"}},
        {id:"bayan_shirey", img:"", unit:"750 ml", price:475000, name:{uz:"Bayan Shirey", ru:"Баян Ширей", en:"Bayan Shirey"}, desc:{uz:"Oq vino",ru:"Белое вино",en:"White wine"}},
        {id:"carmen", img:"", unit:"750 ml", price:475000, name:{uz:"Carmen Cabernet Sauvignon", ru:"Carmen Cabernet Sauvignon", en:"Carmen Cabernet Sauvignon"}, desc:{uz:"Qizil vino",ru:"Красное вино",en:"Red wine"}},
        {id:"oriolus", img:"", unit:"750 ml", price:475000, name:{uz:"Oriolus Grenache Rose", ru:"Oriolus Grenache Rosé", en:"Oriolus Grenache Rosé"}, desc:{uz:"Rose vino",ru:"Розовое вино",en:"Rosé wine"}},
        {id:"salut_brut", img:"", unit:"750 ml", price:350000, name:{uz:"Salut Brut", ru:"Salut Brut", en:"Salut Brut"}, desc:{uz:"Igrik vino",ru:"Игристое вино",en:"Sparkling wine"}}
      ]},

    { id:"tea", group:"drinks", icon:"🍵",
      name:{uz:"Choy", ru:"Чай", en:"Tea"},
      items:[
        {id:"assorted_cup", img:"", unit:"CUP 200 ml", price:30000, name:{uz:"Premium assortiy choy (piyola)", ru:"Премиум ассорти чай (чашка)", en:"Premium assorted tea (cup)"}, desc:{uz:"Qora yoki ko‘k choy tanlash bo‘yicha", ru:"Чёрный или зелёный на выбор", en:"Black or green, your choice"}},
        {id:"assorted_pot", img:"", unit:"POT 700 ml", price:35000, name:{uz:"Premium assortiy choy (choynak)", ru:"Премиум ассорти чай (чайник)", en:"Premium assorted tea (pot)"}, desc:{uz:"Earl Grey, Jasmine, Mint, Oolong va b.", ru:"Earl Grey, жасмин, мята, улун и др.", en:"Earl Grey, Jasmine, Mint, Oolong, etc."}},
        {id:"turkish_bardak", img:"", unit:"bardak", price:10000, name:{uz:"Turkcha choy (bardak)", ru:"Турецкий чай (бардак)", en:"Turkish tea (bardak cup)"}, desc:{uz:"",ru:"",en:""}},
        {id:"turkish_pot", img:"", unit:"choynak", price:80000, name:{uz:"Turkcha choy (choynak)", ru:"Турецкий чай (чайник)", en:"Turkish tea in teapot"}, desc:{uz:"",ru:"",en:""}}
      ]},

    { id:"coffee", group:"drinks", icon:"☕",
      name:{uz:"Kofe", ru:"Кофе", en:"Coffee"},
      items:[
        {id:"ristretto", img:"", unit:"15 ml", price:35000, name:{uz:"Ristretto", ru:"Ристретто", en:"Ristretto"}, desc:{uz:"",ru:"",en:""}},
        {id:"espresso", img:"", unit:"30 ml", price:35000, name:{uz:"Espresso", ru:"Эспрессо", en:"Espresso"}, desc:{uz:"",ru:"",en:""}},
        {id:"americano", img:"", unit:"120 ml", price:35000, name:{uz:"Americano", ru:"Американо", en:"Americano"}, desc:{uz:"",ru:"",en:""}},
        {id:"double_espresso", img:"", unit:"60 ml", price:45000, name:{uz:"Double Espresso", ru:"Двойной эспрессо", en:"Double Espresso"}, desc:{uz:"",ru:"",en:""}},
        {id:"cappuccino", img:"", unit:"150 ml", price:45000, name:{uz:"Cappuccino", ru:"Капучино", en:"Cappuccino"}, desc:{uz:"",ru:"",en:""}},
        {id:"latte", img:"", unit:"300 ml", price:45000, name:{uz:"Latte", ru:"Латте", en:"Latte"}, desc:{uz:"",ru:"",en:""}},
        {id:"flat_white", img:"", unit:"250 ml", price:50000, name:{uz:"Flat White", ru:"Флэт Уайт", en:"Flat White"}, desc:{uz:"",ru:"",en:""}},
        {id:"raf", img:"", unit:"250 ml", price:55000, name:{uz:"Raf Coffee", ru:"Раф", en:"Raf Coffee"}, desc:{uz:"",ru:"",en:""}},
        {id:"hot_choco", img:"", unit:"250 ml", price:60000, name:{uz:"Hot Chocolate", ru:"Горячий шоколад", en:"Hot Chocolate"}, desc:{uz:"",ru:"",en:""}}
      ]},

    { id:"iced", group:"drinks", icon:"🧊",
      name:{uz:"Sovuq kofe va choy", ru:"Холодный кофе и чай", en:"Iced Coffee & Tea"},
      items:[
        {id:"ice_americano", img:"", unit:"400 ml", price:40000, name:{uz:"Ice Americano", ru:"Айс Американо", en:"Ice Americano"}, desc:{uz:"",ru:"",en:""}},
        {id:"ice_cappuccino", img:"", unit:"400 ml", price:45000, name:{uz:"Ice Cappuccino", ru:"Айс Капучино", en:"Ice Cappuccino"}, desc:{uz:"",ru:"",en:""}},
        {id:"ice_latte", img:"", unit:"400 ml", price:45000, name:{uz:"Ice Latte", ru:"Айс Латте", en:"Ice Latte"}, desc:{uz:"",ru:"",en:""}},
        {id:"mocca", img:"", unit:"400 ml", price:55000, name:{uz:"Mocca", ru:"Мокка", en:"Mocca"}, desc:{uz:"",ru:"",en:""}},
        {id:"affogato", img:"", unit:"400 ml", price:55000, name:{uz:"Affogato", ru:"Аффогато", en:"Affogato"}, desc:{uz:"",ru:"",en:""}},
        {id:"berry_ice_tea", img:"", unit:"400 ml", price:40000, name:{uz:"Berry Ice Tea", ru:"Ягодный айс-ти", en:"Berry Ice Tea"}, desc:{uz:"1L — 80.000",ru:"1 л — 80 000",en:"1L — 80,000"}},
        {id:"karkade_ice_tea", img:"", unit:"400 ml", price:40000, name:{uz:"Karkade Ice Tea", ru:"Каркаде айс-ти", en:"Karkade Ice Tea"}, desc:{uz:"1L — 80.000",ru:"1 л — 80 000",en:"1L — 80,000"}}
      ]},

    { id:"lemonades", group:"drinks", icon:"🍋",
      name:{uz:"Limonadlar", ru:"Лимонады", en:"Lemonades"},
      items:[
        {id:"mango_maracuya", img:"", unit:"400 ml", price:45000, name:{uz:"Mango Marakuya", ru:"Манго-маракуйя", en:"Mango Maracuya"}, desc:{uz:"1L — 110.000",ru:"1 л — 110 000",en:"1L — 110,000"}},
        {id:"kiwi_maracuya", img:"", unit:"400 ml", price:45000, name:{uz:"Kivi Marakuya", ru:"Киви-маракуйя", en:"Kiwi Maracuya"}, desc:{uz:"1L — 110.000",ru:"1 л — 110 000",en:"1L — 110,000"}},
        {id:"berry_lem", img:"", unit:"400 ml", price:45000, name:{uz:"Berry", ru:"Ягодный", en:"Berry"}, desc:{uz:"1L — 110.000",ru:"1 л — 110 000",en:"1L — 110,000"}},
        {id:"arnold_palmer", img:"", unit:"400 ml", price:45000, name:{uz:"Arnold Palmer", ru:"Арнольд Палмер", en:"Arnold Palmer"}, desc:{uz:"1L — 110.000",ru:"1 л — 110 000",en:"1L — 110,000"}},
        {id:"tarragon", img:"", unit:"400 ml", price:45000, name:{uz:"Tarxun", ru:"Тархун", en:"Tarragon"}, desc:{uz:"1L — 110.000",ru:"1 л — 110 000",en:"1L — 110,000"}}
      ]},

    { id:"milkshakes", group:"drinks", icon:"🥤",
      name:{uz:"Milksheyklar", ru:"Молочные коктейли", en:"Milkshakes"},
      items:[
        {id:"banana_shake", img:"", unit:"390 ml", price:50000, name:{uz:"Banan milksheyk", ru:"Банановый", en:"Banana milkshake"}, desc:{uz:"",ru:"",en:""}},
        {id:"berry_shake", img:"", unit:"390 ml", price:50000, name:{uz:"Rezavor milksheyk", ru:"Ягодный", en:"Berry milkshake"}, desc:{uz:"",ru:"",en:""}},
        {id:"kiwi_shake", img:"", unit:"390 ml", price:50000, name:{uz:"Kivi milksheyk", ru:"Киви", en:"Kiwi milkshake"}, desc:{uz:"",ru:"",en:""}},
        {id:"choco_shake", img:"", unit:"390 ml", price:50000, name:{uz:"Shokolad milksheyk", ru:"Шоколадный", en:"Chocolate milkshake"}, desc:{uz:"",ru:"",en:""}}
      ]},

    { id:"mocktails", group:"drinks", icon:"🍹",
      name:{uz:"Mokteyllar", ru:"Безалкогольные коктейли", en:"Mocktails"},
      items:[
        {id:"virgin_mojito", img:"", unit:"400 ml", price:50000, name:{uz:"Virgin Mojito", ru:"Виргин Мохито", en:"Virgin Mojito"}, desc:{uz:"1L — 110.000",ru:"1 л — 110 000",en:"1L — 110,000"}},
        {id:"strawberry_daiquiri", img:"", unit:"400 ml", price:50000, name:{uz:"Strawberry Daiquiri", ru:"Клубничный дайкири", en:"Strawberry Daiquiri"}, desc:{uz:"",ru:"",en:""}},
        {id:"sunrise", img:"", unit:"400 ml", price:50000, name:{uz:"Sunrise Mocktail", ru:"Санрайз", en:"Sunrise Mocktail"}, desc:{uz:"",ru:"",en:""}},
        {id:"mango_lassi", img:"", unit:"400 ml", price:65000, name:{uz:"Mango Lassi", ru:"Манго Ласси", en:"Mango Lassi"}, desc:{uz:"",ru:"",en:""}},
        {id:"pina_colada", img:"", unit:"400 ml", price:65000, name:{uz:"Pina Colada", ru:"Пина Колада", en:"Pina Colada"}, desc:{uz:"",ru:"",en:""}}
      ]},

    { id:"soft", group:"drinks", icon:"🥤",
      name:{uz:"Alkogolsiz ichimliklar", ru:"Безалкогольные напитки", en:"Soft Drinks"},
      items:[
        {id:"still_330", img:"", unit:"330 ml", price:25000, name:{uz:"Gazsiz suv", ru:"Вода без газа", en:"Still water"}, desc:{uz:"",ru:"",en:""}},
        {id:"sparkling_330", img:"", unit:"330 ml", price:25000, name:{uz:"Gazli suv", ru:"Вода с газом", en:"Sparkling water"}, desc:{uz:"",ru:"",en:""}},
        {id:"coca", img:"", unit:"250 ml", price:25000, name:{uz:"Coca-Cola Classic", ru:"Coca-Cola Classic", en:"Coca-Cola Classic"}, desc:{uz:"",ru:"",en:""}},
        {id:"coca_zero", img:"", unit:"250 ml", price:25000, name:{uz:"Coca-Cola Zero", ru:"Coca-Cola Zero", en:"Coca-Cola Zero"}, desc:{uz:"",ru:"",en:""}},
        {id:"fanta", img:"", unit:"250 ml", price:25000, name:{uz:"Fanta", ru:"Fanta", en:"Fanta"}, desc:{uz:"",ru:"",en:""}},
        {id:"sprite", img:"", unit:"250 ml", price:25000, name:{uz:"Sprite", ru:"Sprite", en:"Sprite"}, desc:{uz:"",ru:"",en:""}},
        {id:"still_750", img:"", unit:"750 ml", price:35000, name:{uz:"Gazsiz suv (katta)", ru:"Вода без газа (0,75 л)", en:"Still water (750 ml)"}, desc:{uz:"",ru:"",en:""}},
        {id:"sparkling_750", img:"", unit:"750 ml", price:35000, name:{uz:"Gazli suv (katta)", ru:"Вода с газом (0,75 л)", en:"Sparkling water (750 ml)"}, desc:{uz:"",ru:"",en:""}},
        {id:"borjomi", img:"", unit:"500 ml", price:45000, name:{uz:"Borjomi", ru:"Боржоми", en:"Borjomi Sparkling"}, desc:{uz:"",ru:"",en:""}},
        {id:"fresh_juice", img:"", unit:"400 ml", price:50000, name:{uz:"Fresh sharbat", ru:"Свежевыжатый сок", en:"Fresh juice"}, desc:{uz:"",ru:"",en:""}},
        {id:"redbull", img:"", unit:"330 ml", price:60000, name:{uz:"Red Bull", ru:"Red Bull", en:"Red Bull"}, desc:{uz:"",ru:"",en:""}},
        {id:"juice", img:"", unit:"1 L", price:70000, name:{uz:"Sharbat", ru:"Сок", en:"Juice"}, desc:{uz:"",ru:"",en:""}},
        {id:"ayran", img:"", unit:"1 L", price:80000, name:{uz:"Fresh Ayron", ru:"Свежий айран", en:"Fresh Ayran"}, desc:{uz:"",ru:"",en:""}}
      ]}
  ]
};
