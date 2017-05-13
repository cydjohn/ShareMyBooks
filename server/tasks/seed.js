const bcrypt = require("bcrypt-nodejs");
const data = require("../data");
const dbConnection = require("../config/mongoConnection");
const book = data.book;
const users = data.user;
const mbData = data.messageBoard;
const privateData = data.privateMessage;
const uuid = require('node-uuid');
const client = require("../config/elasticsearch");
var moment = require('moment');

client.indices.delete({
    index: '_all'
}, function (err, res) {

    if (err) {
        console.error(err.message);
    } else {
        console.log('Indexes have been deleted!');
    }
});

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;
    }).then((db) => {
        requestBody = {
            _id: uuid.v4(),
            firstName: "John",
            lastName: "Doe",
            userID: "jdoe",
            password: "12345",//not hashed yet obviously
            address: "45 Elm Street New York, NY 10028",//made up the address
            email: "jdoe@gmail.com",
            phoneNumber: "2123456789",
            userPhotoID: "jdoe",
            userTotalPoints: 16
        }
        return users.addUser(requestBody);
    }).then((John) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: John["userID"],
            Title: "The Hobbit: or There and Back Again",
            Author: "J.R.R. Tolkien",
            bookPhotoID1: "2",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "1999",
            Category: "Teen & Young Adult Books",
            Condition: "good",
            Location: "New York, NY",
            Description: "A great modern classic and the prelude to THE LORD OF THE RINGS. Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure. They have launched a plot to raid the treasure hoard guarded by Smaug the Magnificent, a large and very dangerous dragon. Bilbo reluctantly joins their quest, unaware that on his journey to the Lonely Mountain he will encounter both a magic ring and a frightening creature known as Gollum. ",
            bookPointsValue: "3",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "Cracking the Coding Interview: 189 Programming Questions and Solutions",
            Author: "Gayle Laakmann McDowell",
            bookPhotoID1: "3",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2015",
            Category: "Computers & Technology",
            Condition: "good",
            Location: "New York, NY",
            Description: "I am not a recruiter. I am a software engineer. And as such, I know what it's like to be asked to whip up brilliant algorithms on the spot and then write flawless code on a whiteboard. I've been through this as a candidate and as an interviewer. Cracking the Coding Interview, 6th Edition is here to help you through this process, teaching you what you need to know and enabling you to perform at your very best. I've coached and interviewed hundreds of software engineers. The result is this book.Learn how to uncover the hints and hidden details in a question, discover how to break down a problem into manageable chunks, develop techniques to unstick yourself when stuck, learn (or re-learn) core computer science concepts, and practice on 189 interview questions and solutions.",
            bookPointsValue: "4",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);

    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "A Game of Thrones (A Song of Ice and Fire, Book 1)",
            Author: "George R.R. Martin",
            bookPhotoID1: "1",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "1997",
            Category: "Science Fiction & Fantasy",
            Condition: "good",
            Location: "New York, NY",
            Description: "In A Game of Thrones, the first book of a projected six, George R.R. Martin rewards readers with a vividly real world, well-drawn characters, complex but coherent plotting, and beautifully constructed prose, which Locus called \"well above the norms of the genre.\" Martin's Seven Kingdoms resemble England during the Wars of the Roses, with the Stark and Lannister families standing in for the Yorks and Lancasters. The story of these two families and their struggle to control the Iron Throne dominates the foreground; in the background is a huge, ancient wall marking the northern border, beyond which barbarians, ice vampires, and direwolves menace the south as years-long winter advances. Abroad, a dragon princess lives among horse nomads and dreams of fiery reconquest. There is much bloodshed, cruelty, and death, but A Game of Thrones is nevertheless compelling; it garnered a Nebula nomination and won the 1996 Locus Award for Best Fantasy Novel. So, on to A Clash of Kings!",
            bookPointsValue: "3",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);

    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "The War of Art: Break Through the Blocks and Win Your Inner Creative Battles",
            Author: "Steven Pressfield",
            bookPhotoID1: "4",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2012",
            Category: "Self-help",
            Condition: "good",
            Location: "New York, NY",
            Description: "A succinct, engaging, and practical guide for succeeding in any creative sphere, The War of Art is nothing less than Sun-Tzu for the soul. What keeps so many of us from doing what we long to do? Why is there a naysayer within? How can we avoid the roadblocks of any creative endeavor—be it starting up a dream business venture, writing a novel, or painting a masterpiece? Bestselling novelist Steven Pressfield identifies the enemy that every one of us must face, outlines a battle plan to conquer this internal foe, then pinpoints just how to achieve the greatest success. The War of Art emphasizes the resolve needed to recognize and overcome the obstacles of ambition and then effectively shows how to reach the highest level of creative discipline. Think of it as tough love . . . for yourself. Whether an artist, writer or business person, this simple, personal, and no-nonsense book will inspire you to seize the potential of your life.",
            bookPointsValue: "4",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);

    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "Goodnight Moon",
            Author: "Margaret Wise Brown",
            bookPhotoID1: "5",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2007",
            Category: "Self-help",
            Condition: "good",
            Location: "New York, NY",
            Description: "In a great green room, tucked away in bed, is a little bunny. Goodnight room, goodnight moon. And to all the familiar things in the softly lit room—to the picture of the three little bears sitting on chairs, to the clocks and his socks, to the mittens and the kittens, to everything one by one—the little bunny says goodnight. In this classic of children's literature, beloved by generations of readers and listeners, the quiet poetry of the words and the gentle, lulling illustrations combine to make a perfect book for the end of the day.",
            bookPointsValue: "2",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((db) => {
        requestBody = {
            _id: uuid.v4(),
            firstName: "Sarah",
            lastName: "Lin",
            userID: "slin",
            password: "67890",//not hashed yet obviously
            address: "23 Madison Road San Fransisco, CA 09867",//made up the address
            email: "slin@gmail.com",
            phoneNumber: "9173247653",
            userPhotoID: "slin",
            userTotalPoints: 16
        }
        return users.addUser(requestBody);
    }).then((slin) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: slin["userID"],
            Title: "The Algorithm Design Manual",
            Author: "Steven S Skiena",
            bookPhotoID1: "6",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "1997",
            Category: "Computers & Technology",
            Condition: "good",
            Location: "San Fransisco, CA",
            Description: "The reader-friendly Algorithm Design Manual provides straightforward access to combinatorial algorithms technology, stressing design over analysis. The first part, Techniques, provides accessible instruction on methods for designing and analyzing computer algorithms. The second part, Resources, is intended for browsing and reference, and comprises the catalog of algorithmic resources, implementations and an extensive bibliography.",
            bookPointsValue: "3",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "Introduction to Algorithms, 3rd Edition",
            Author: "Thomas H. Cormen",
            bookPhotoID1: "7",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2009",
            Category: "Computers & Technology",
            Condition: "good",
            Location: "San Fransisco, CA",
            Description: "Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness. The book covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. Each chapter is relatively self-contained and can be used as a unit of study. The algorithms are described in English and in a pseudocode designed to be readable by anyone who has done a little programming. The explanations have been kept elementary without sacrificing depth of coverage or mathematical rigor.",
            bookPointsValue: "3",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "The Elements of Statistical Learning: Data Mining, Inference, and Prediction, Second Edition",
            Author: "Trevor Hastie ",
            bookPhotoID1: "8",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2016",
            Category: "Computers & Technology",
            Condition: "good",
            Location: "San Fransisco, CA",
            Description: "This book describes the important ideas in a variety of fields such as medicine, biology, finance, and marketing in a common conceptual framework. While the approach is statistical, the emphasis is on concepts rather than mathematics. Many examples are given, with a liberal use of colour graphics. It is a valuable resource for statisticians and anyone interested in data mining in science or industry. The book's coverage is broad, from supervised learning (prediction) to unsupervised learning. The many topics include neural networks, support vector machines, classification trees and boosting---the first comprehensive treatment of this topic in any book.",
            bookPointsValue: "4",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "SQL in 10 Minutes, Sams Teach Yourself (4th Edition)",
            Author: "Ben Forta",
            bookPhotoID1: "9",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2012",
            Category: "Computers & Technology",
            Condition: "good",
            Location: "San Fransisco, CA",
            Description: "Expert trainer and popular author Ben Forta teaches you just the parts of SQL you need to know–starting with simple data retrieval and quickly going on to more complex topics including the use of joins, subqueries, stored procedures, cursors, triggers, and table constraints.",
            bookPointsValue: "4",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "Data Science from Scratch: First Principles with Python",
            Author: "Joel Grus",
            bookPhotoID1: "10",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2015",
            Category: "Computers & Technology",
            Condition: "good",
            Location: "San Fransisco, CA",
            Description: "If you have an aptitude for mathematics and some programming skills, author Joel Grus will help you get comfortable with the math and statistics at the core of data science, and with hacking skills you need to get started as a data scientist. Today’s messy glut of data holds answers to questions no one’s even thought to ask. This book provides you with the know-how to dig those answers out.",
            bookPointsValue: "2",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((db) => {
        requestBody = {
            _id: uuid.v4(),
            firstName: "Sam",
            lastName: "Thompson",
            userID: "sthompson",
            password: "24680",//not hashed yet obviously
            address: "45 Washington Street Hoboken, NJ 10028",//made up the address
            email: "sthompson@gmail.com",
            phoneNumber: "9175675478",
            userPhotoID: "sthompson",
            userTotalPoints: 22
        }
        return users.addUser(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["userID"],
            Title: "Understanding Criminal Law",
            Author: "Joshua Dressler",
            bookPhotoID1: "11",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2015",
            Category: "Law",
            Condition: "good",
            Location: "Hoboken, NJ",
            Description: "This comprehensive and clearly written Understanding treatise is frequently cited by scholars and courts in their analysis of substantive criminal law. Understanding Criminal Law is designed to be taught in conjunction with any casebook. The topics covered are those most often raised in criminal law casebooks, and coverage of these subjects is meant to complement professors' classroom discussions. The text focuses on the basic elements of, and defenses to, specific crimes such as homicide, rape, and theft, group criminality, and inchoate liability. Understanding Criminal Law also covers theories of punishment, sources of the criminal law, and overarching principles such as legality and proportionality. The common law is emphasized with extensive comparisons to the Model Penal Code and thoughtful examination of the underpinnings of the utilitarian philosophies of substantive criminal law. The text of Understanding Criminal Law encourages students to consider the approach these philosophies would take to a particular matter under discussion, thus providing an excellent learning tool for gaining a firm understanding of how our criminal justice system works.",
            bookPointsValue: "3",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "Examples & Explanations: Criminal Law",
            Author: "Richard G. Singer",
            bookPhotoID1: "12",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2013",
            Category: "Law",
            Condition: "good",
            Location: "Hoboken, NJ",
            Description: "A favorite among successful students, and often recommended by professors, the unique Examples & Explanations series gives you extremely clear introductions to concepts followed by realistic examples that mirror those presented in the classroom throughout the semester. Use at the beginning and midway through the semester to deepen your understanding through clear explanations, corresponding hypothetical fact patterns, and analysis. Then use to study for finals by reviewing the hypotheticals as well as the structure and reasoning behind the accompanying analysis. Designed to complement your casebook, the trusted Examples & Explanations titles get right to the point in a conversational, often humorous style that helps you learn the material each step of the way and prepare for the exam at the end of the course.",
            bookPointsValue: "3",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "Are Prisons Obsolete?",
            Author: "Angela Y. Davis",
            bookPhotoID1: "13",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2003",
            Category: "Law",
            Condition: "good",
            Location: "Hoboken, NJ",
            Description: "With her characteristic brilliance, grace and radical audacity, Angela Y. Davis has put the case for the latest abolition movement in American life: the abolition of the prison. As she quite correctly notes, American life is replete with abolition movements, and when they were engaged in these struggles, their chances of success seemed almost unthinkable. For generations of Americans, the abolition of slavery was sheerest illusion. Similarly,the entrenched system of racial segregation seemed to last forever, and generations lived in the midst of the practice, with few predicting its passage from custom. The brutal, exploitative (dare one say lucrative?) convict-lease system that succeeded formal slavery reaped millions to southern jurisdictions (and untold miseries for tens of thousands of men, and women). Few predicted its passing from the American penal landscape. Davis expertly argues how social movements transformed these social, political and cultural institutions, and made such practices untenable. In Are Prisons Obsolete?, Professor Davis seeks to illustrate that the time for the prison is approaching an end. She argues forthrightly for 'decarceration', and argues for the transformation of the society as a whole.",
            bookPointsValue: "4",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "The Legal Environment of Business",
            Author: "Roger E. Meiners",
            bookPhotoID1: "14",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2014",
            Category: "Law",
            Condition: "good",
            Location: "Hoboken, NJ",
            Description: "THE LEGAL ENVIRONMENT OF BUSINESS provides a practical introduction to the structure and function of the legal system from the perspective of the professional nonlawyer. While noting our legal heritage, there is a strong emphasis on the nuts and bolts of basic legal rules that most impact business today. This popular text effectively adapts a traditional case focus for the unique needs of business students. Incorporating clear and concise coverage of a wide range of up-to-date topics, the twelfth edition of this trusted text introduces key points of law through business-specific examples and realistic scenarios that students can appreciate. The authors' readable style complements their extensive knowledge of domestic and international business to make the text a favorite among instructors and students alike.",
            bookPointsValue: "4",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "Law, Business and Society",
            Author: "Tony McAdams",
            bookPhotoID1: "15",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2014",
            Category: "Law",
            Condition: "good",
            Location: "Hoboken, NJ",
            Description: "Law, Business and Society, 11e fits both upper-division undergraduate and masters levels courses in the legal environment of business, government and business, and business and society. Law, Business and Society, takes an interdisciplinary approach, using elements of law, political economy, international business, ethics, social responsibility, and management. Students will find an interesting, provocative reading experience filled with contemporary legal and ethical conflicts emerging from today’s news, as well as scholarly results, surveys, polls, data, anecdotes, and other specific details that lend credibility, immediacy, and interest to the reading experience.",
            bookPointsValue: "8",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((db) => {
        requestBody = {
            _id: uuid.v4(),
            firstName: "Lisa",
            lastName: "Johnson",
            userID: "ljohnson",
            password: "13579",//not hashed yet obviously
            address: "32 Pine Tree Road Ithaca, NY 14850",//made up the address
            email: "ljohnson@gmail.com",
            phoneNumber: "9172134543",
            userPhotoID: "ljohnson",
            userTotalPoints: 16
        }
        return users.addUser(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["userID"],
            Title: "First Aid for the USMLE",
            Author: "Tao Le",
            bookPhotoID1: "16",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2017",
            Category: "Medicine & Health Sciences",
            Condition: "good",
            Location: "Ithaca, NY",
            Description: "This annually updated review delivers a comprehensive collection of high-yield facts and mnemonics that pinpoint exactly what you need to know to pass the exam. Co-authored by medical students who recently took the boards, it provides a complete framework to help you prepare for the most stressful exam of your career.",
            bookPointsValue: "3",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "Growing Physician Leaders: Empowering Doctors to Improve Our Healthcare",
            Author: "Mark Hertling",
            bookPhotoID1: "17",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2016",
            Category: "Medicine & Health Sciences",
            Condition: "good",
            Location: "Ithaca, NY",
            Description: "In Growing Physician Leaders, retired Army Lieutenant General Mark Hertling applies his four decades of military leadership to the world of healthcare, resulting in a profoundly constructive and practical book with the power to reshape and reenergize any healthcare organization in America today. Designed to help physicians master the art of leading people, it takes them, step-by-step, through a proven process that can help anyone become a more effective leader.",
            bookPointsValue: "3",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "Psychoanalytic Psychotherapy: A Practitioner's Guide",
            Author: "Nancy McWilliams",
            bookPhotoID1: "18",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2004",
            Category: "Medicine & Health Sciences",
            Condition: "good",
            Location: "Ithaca, NY",
            Description: "Addressing the art and science of psychodynamic treatment, Nancy McWilliams distills the essential principles of clinical practice, including effective listening and talking; transference and countertransference; emotional safety; and an empathic, attuned attitude toward the patient. The book describes the values, assumptions, and clinical and research findings that guide the psychoanalytic enterprise, and shows how to integrate elements of other theoretical perspectives. It discusses the phases of treatment and covers such neglected topics as educating the client about the therapeutic process, handling complex challenges to boundaries, and attending to self-care. Presenting complex information in personal, nontechnical language enriched by in-depth clinical vignettes, this is an essential psychoanalytic work and training text for therapists.",
            bookPointsValue: "4",
           timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "Advanced Myofascial Techniques: Neck, Head, Spine and Ribs",
            Author: "Til Luchau",
            bookPhotoID1: "19",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2016",
            Category: "Medicine & Health Sciences",
            Condition: "good",
            Location: "Ithaca, NY",
            Description: "A beautiful visual and narrative guide to a selection of unique hands-on myofascial techniques. Techniques are chosen for inclusion based on their relevance to the most common client complaints. Each chapter presents key considerations, anatomy overview, therapeutic goals, and cautions relevant to hands-on work.",
            bookPointsValue: "4",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "Textbook of Neonatal Resuscitation",
            Author: "American Academy of Pediatrics ",
            bookPhotoID1: "20",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2016",
            Category: "Medicine & Health Sciences",
            Condition: "good",
            Location: "Ithaca, NY",
            Description: "The Neonatal Resuscitation Program (NRP) is an educational program jointly sponsored by the American Academy of Pediatrics (AAP) and the American Heart Association (AHA). The course is designed to teach an evidence-based approach to resuscitation of the newborn to hospital staff who care for newborns at the time of delivery.",
            bookPointsValue: "2",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then(() => {
        requestBody = {
            _id: uuid.v4(),
            firstName: "Jane",
            lastName: "Anderson",
            userID: "janderson",
            password: "abcde",//not hashed yet obviously
            address: "123 Cactus Lane Houston,TX 23415",//made up the address
            email: "janderson@gmail.com",
            phoneNumber: "9178736475",
            userPhotoID: "janderson",
            userTotalPoints: 16
        }
        return users.addUser(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["userID"],
            Title: "The Healthy Chocoholic: Over 60 healthy chocolate recipes free of gluten & dairy",
            Author: "Dawn Parker",
            bookPhotoID1: "21",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2015",
            Category: "Cookbooks",
            Condition: "good",
            Location: "Houston,TX",
            Description: "The Healthy Chocoholic is a cookbook for chocolate lovers that emphasizes healthy ingredients and simple, easy-to-follow recipes. Since food intolerances are on the rise, top allergens like gluten, dairy, soy, corn and peanuts are excluded and many of the recipes are perfect for those following a paleo or vegan eating style. In this book, you’ll learn how to make over 60 delicious and healthy chocolate treats. Discover new and unique recipes for: smoothies, no-bake treats, candy, cookies brownies & bars, pies & cakes, hot chocolate, and more All of the recipes in this book contain healthy ingredients and are lower in sugar than typical sweet treat recipes. ALL of the recipes are free of gluten, dairy, soy, corn and legumes, including peanuts. They are also free of refined white sugar. MOST of the recipes are VEGAN (eggs are used in a few recipes) and PALEO (all recipes are gluten-free, but brown rice cereal and gluten-free oats are used in a few recipes).",
            bookPointsValue: "3",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "Vegan for Everybody: Foolproof Plant-Based Recipes for Breakfast, Lunch, Dinner, and In-Between",
            Author: "America's Test Kitchen",
            bookPhotoID1: "22",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2017",
            Category: "Cookbooks",
            Condition: "good",
            Location: "Houston,TX",
            Description: "Veganism is going mainstream. The benefits of consuming fewer animal products appear frequently in the news, and public figures and celebrities have openly embraced the tenets of a vegan diet, bringing it further into the food consciences of baby boomers, millennials, and postmillennials alike. Whether exploring a vegan diet for health, environmental, or political reasons, more and more people are looking to get hearty, plant-based meals onto their table. But eating vegan can seem overwhelming: Will it be flavorful? Satisfying? Easy to make? And it's easy to rely on processed foods. America's Test Kitchen addresses head-on what intimidates people: finding great-tasting and filling vegan protein options, cooking without dairy, preparing different whole grains and vegetables, and even baking. With more than 200 vibrant, foolproof recipes including proper day-starters, \"cheesy\" pizza you'll actually want to eat, filling vegetable-and-grain bowls, new dinner favorites, appetizers, DIY staples, and the ultimate birthday cake, this cookbook has something satisfying for everyone--the committed vegan or simply those looking to freshen up their cooking.",
            bookPointsValue: "3",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "Superfood Smoothies: 100 Delicious, Energizing & Nutrient-dense Recipes",
            Author: "Julie Morris",
            bookPhotoID1: "23",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2013",
            Category: "Cookbooks",
            Condition: "good",
            Location: "Houston,TX",
            Description: "Everyone loves smoothies—and this is the ultimate smoothie book, written by Julie Morris, author of Superfood Kitchen and a superfood expert! Morris whips up 100 nutrient-rich recipes using the world's most antioxidant-, vitamin- and mineral-packed foods, and offers innovative culinary methods for making your smoothies incredibly nutritious and delicious.",
            bookPointsValue: "4",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "The Fully Raw Diet: 21 Days to Better Health, with Meal and Exercise Plans, Tips, and 75 Recipes",
            Author: "Kristina Carrillo-Bucaram",
            bookPhotoID1: "24",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2016",
            Category: "Medicine & Health Sciences",
            Condition: "good",
            Location: "Houston,TX",
            Description: "The Fully Raw Diet offers a 21-day plan to help people enjoy a clean, plant-based, healthful approach to eating. Kristina Carrillo-Bucaram transformed her own health by eating vegetables, fruits, nuts, and seeds—100% fresh, raw, and ripe—and she is now the vivacious, uber-healthy founder of the FullyRaw brand. Her ten-year success with this lifestyle inspires thousands via social media, and her 21-day FullyRaw Video Challenge on YouTube in 2014 dramatically grew her fan base. This book shares her advice and will correspond to a new video challenge, with meal and exercise tips, recipes, and vivid photos. Fans will love the smoothies, salads, main dishes, and desserts, such as Lemon-Ginger Blast, Spicy Mango Basil Salad, Yellow Squash Fettuccine Alfredo, Melon Pops, and Caramel-Apple Cups.",
            bookPointsValue: "4",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        requestBody = {
            _id: uuid.v4(),
            uploadedBy: b["uploadedBy"],
            Title: "Unlucky 13 (Women's Murder Club)",
            Author: "James Patterson",
            bookPhotoID1: "25",
            bookPhotoID2: null,
            bookPhotoID3: null,
            Year: "2014",
            Category: "Mystery,Thriller, & Suspense",
            Condition: "good",
            Location: "Houston,TX",
            Description: "San Francisco Detective Lindsay Boxer is loving her life as a new mother. With an attentive husband, a job she loves, plus best friends who can talk about anything from sex to murder, things couldn't be better. Then the FBI sends Lindsay a photo of a killer from her past, and her happy world is shattered. The picture captures a beautiful woman at a stoplight. But all Lindsay sees is the psychopath behind those seductive eyes: Mackie Morales, the most deranged and dangerous mind the Women's Murder Club has ever encountered. In this pulse-racing, emotionally charged novel by James Patterson, the Women's Murder Club must find a killer--before she finds them first.",
            bookPointsValue: "2",
            timestampOfUpload: moment().format(),
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then((b) => {
        let message = {
            userName: "jdoe",
            userMessage: "I love this site!",
            room: "general"
        }
        return mbData.addMessage(message);
    }).then((b) => {
        let message = {
            userName: "jdoe",
            userMessage: "How do I add a book?",
            room: "supportRequest"
        }
        return mbData.addMessage(message);
    }).then((b) => {
        let message = {
            userName: "ljohnson",
            userMessage: "I love books!",
            room: "other"
        }
        return mbData.addMessage(message);
    }).then(() => {
        let newMessage = {
        fromUserId: "jdoe",
        toUserId: "slin",
        messageText: "message 1"
    }
        return privateData.addPrivateMessage(newMessage);
    }).then(() => {
        let newMessage = {
        fromUserId: "jdoe",
        toUserId: "slin",
        messageText: "message 2"
    }
        return privateData.addPrivateMessage(newMessage);
    }).then(() => {
        let newMessage = {
        fromUserId: "slin",
        toUserId: "jdoe",
        messageText: "message 1"
    }
        return privateData.addPrivateMessage(newMessage);
    }).then(() => {
        let newMessage = {
        fromUserId: "slin",
        toUserId: "jdoe",
        messageText: "message 2"
    }
        return privateData.addPrivateMessage(newMessage);
    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});
