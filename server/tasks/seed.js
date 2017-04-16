const bcrypt = require("bcrypt-nodejs");
const data = require("../data");
const dbConnection = require("../config/mongoConnection");
const book = data.book;
const users = data.user;
const uuid = require('node-uuid');

dbConnection().then(db => {
    return db.dropDatabase().then(() => {
        return dbConnection;

    }).then((db) => {
        requestBody = {
            _id: uuid.v4(),
            firstName: "John",
            lastName: "Doe",
            userID: "jdoe",
            passwordHash: "12345",//not hashed yet obviously
            address: "45 Elm Street New York, NY 10028",//made up the address
            email: "jdoe@gmail.com",
            phoneNumber: "2123456789",
            userPhotoID: "1",
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
            Category: "Teen & Young Adult Books ",
            Condition: "good",
            Location: "New York, NY",
            Description: "A great modern classic and the prelude to THE LORD OF THE RINGS. Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure. They have launched a plot to raid the treasure hoard guarded by Smaug the Magnificent, a large and very dangerous dragon. Bilbo reluctantly joins their quest, unaware that on his journey to the Lonely Mountain he will encounter both a magic ring and a frightening creature known as Gollum. ",
            bookPointsValue: "3",
            timestampOfUpload: "2015-02-10T10:50:42.389Z",
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
            Category: "Computers & Technology ",
            Condition: "good",
            Location: "New York, NY",
            Description: "I am not a recruiter. I am a software engineer. And as such, I know what it's like to be asked to whip up brilliant algorithms on the spot and then write flawless code on a whiteboard. I've been through this as a candidate and as an interviewer. Cracking the Coding Interview, 6th Edition is here to help you through this process, teaching you what you need to know and enabling you to perform at your very best. I've coached and interviewed hundreds of software engineers. The result is this book.Learn how to uncover the hints and hidden details in a question, discover how to break down a problem into manageable chunks, develop techniques to unstick yourself when stuck, learn (or re-learn) core computer science concepts, and practice on 189 interview questions and solutions.",
            bookPointsValue: "4",
            timestampOfUpload: "2015-03-10T10:50:42.389Z",
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
            timestampOfUpload: "2014-02-10T10:50:42.389Z",
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
            timestampOfUpload: "2016-03-10T10:50:42.389Z",
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
            timestampOfUpload: "2016-11-10T10:50:42.389Z",
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
            passwordHash: "67890",//not hashed yet obviously
            address: "23 Madison Road San Fransisco, CA 09867",//made up the address
            email: "slin@gmail.com",
            phoneNumber: "9173247653",
            userPhotoID: "2",
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
            timestampOfUpload: "2014-02-10T10:50:42.389Z",
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
            timestampOfUpload: "2016-11-10T10:50:42.389Z",
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
            timestampOfUpload: "2015-02-10T10:50:42.389Z",
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
            timestampOfUpload: "2016-07-10T10:50:42.389Z",
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
            timestampOfUpload: "2016-03-10T10:50:42.389Z",
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
            timestampOfUpload: "2016-11-10T10:50:42.389Z",
            numberOfRequests: 0,
            visibleBoolean: true
        }
        return book.addBook(requestBody);
    }).then(() => {
        console.log("Done seeding database");
        db.close();
    });
}, (error) => {
    console.error(error);
});
