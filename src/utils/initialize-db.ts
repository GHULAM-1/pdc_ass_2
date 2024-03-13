"use server";
import mongoose from "mongoose";
import fs from "fs";

const initialzeDataInDatabase = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(
        "mongodb+srv://ghulam:1234@cluster0.mjy4o3f.mongodb.net/CreateFeatureDB?retryWrites=true&w=majority&appName=Cluster0"
      );
      console.log("db connected");

      const db = mongoose.connection.db;

      const { GridFSBucket } = mongoose.mongo;

      const bucket = new GridFSBucket(db, { bucketName: "features" });
      console.log("featuers collection created");
      // inserting quote image
      fs.createReadStream("./quote.jpeg").pipe(
        bucket.openUploadStream("image", {
          chunkSizeBytes: 1048576,
          metadata: { featureType: "quote", title: "david goggins quote" },
        })
      );

      // inserting mp4 song

      fs.createReadStream("./lalkaran_song.mp4").pipe(
        bucket.openUploadStream("video", {
          chunkSizeBytes: 1048576,
          metadata: {
            featureType: "videos",
            title: "lalkaran song video",
            quality: "720P",
            duration: "2:40",
          },
        })
      );

      // inserting mp3 song

      fs.createReadStream("./king_shit_song.mp3").pipe(
        bucket.openUploadStream("song", {
          chunkSizeBytes: 1048576,
          metadata: {
            featureType: "songs",
            title: "king shit song",
            quality: "64kbs",
            duration: "3:47",
          },
        })
      );

      // insering .pdf book

      fs.createReadStream("./eat_that_frog.pdf").pipe(
        bucket.openUploadStream("book", {
          chunkSizeBytes: 1048576,
          metadata: {
            featureType: "books",
            title: "eat that frog",
            ISBNNumber: "9781576754221",
            publicationDate: "9 september, 2001",
          },
        })
      );

      // populating creators collection
      const creatorsSchema = new mongoose.Schema({
        name: String,
        profession: String,
        contactInfo: String,
      });

      // Create a model from the schema
      const creators = mongoose.model("creators", creatorsSchema);

      await creators.create([
        {
          name: "John Doe",
          profession: "Writer",
          contactInfo: "john@example.com",
        },
        {
          name: "Jane Smith",
          profession: "Artist",
          contactInfo: "jane@example.com",
        },
        {
          name: "Bob Johnson",
          profession: "Musician",
          contactInfo: "bob@example.com",
        },
      ]);
    }
  } catch (error) {
    console.log(error);
  }
};

export default initialzeDataInDatabase;
