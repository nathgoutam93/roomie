import {
  ID,
  Account,
  Client,
  Databases,
  AppwriteException,
  Storage,
  Models,
  Query,
} from "appwrite";
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID,
  APPWRITE_INTERESTS_COLLECTION_ID,
  APPWRITE_LIFESTYLES_COLLECTION_ID,
  APPWRITE_BUCKET_ID,
} from "@env";
import { uriToFile } from "../utils/uriToFile";

const appwriteClient = new Client()
  .setEndpoint(APPWRITE_ENDPOINT)
  .setProject(APPWRITE_PROJECT_ID);

type CreateUserAccount = {
  email: string;
  password: string;
};

type LoginUserAccount = {
  email: string;
  password: string;
};

class AppwriteService {
  account: Account;
  db: Databases;
  storage: Storage;

  constructor() {
    this.account = new Account(appwriteClient);
    this.db = new Databases(appwriteClient);
    this.storage = new Storage(appwriteClient);
  }

  async createAccount({ email, password }: CreateUserAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password
      );

      if (userAccount) {
        return this.login({ email, password });
      }
    } catch (error) {
      if (error instanceof AppwriteException) {
        throw Error(error.message);
      }
      console.log("AppwriteService.createAccount ::" + error);
    }
  }

  async login({ email, password }: LoginUserAccount) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      if (error instanceof AppwriteException) {
        throw Error(error.message);
      }
      console.log("AppwriteService.login ::" + error);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("AppwriteService.getCurrentAccount ::" + error);
    }
  }

  async getCurrentSession() {
    try {
      return await this.account.getSession("current");
    } catch (error) {
      console.log("AppwriteService.session ::" + error);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      if (error instanceof AppwriteException) {
        throw Error(error.message);
      }
      console.log("AppwriteService.getCurrentAccount ::" + error);
    }
  }

  // Data

  async createUser(userId: string, data: any) {
    try {
      console.log("createUser::" + JSON.stringify(data));

      const { age, gender, genderPreference, image, username } = data;

      const public_url = await this.uploadImage(image);

      if (public_url) {
        const userData = {
          name: username,
          age: age,
          gender: gender,
          profile_pic_url: public_url,
          preferred_gender: [genderPreference],
        };

        return await this.db.createDocument(
          APPWRITE_DATABASE_ID,
          APPWRITE_USER_COLLECTION_ID,
          userId,
          userData
        );
      }
    } catch (error) {
      console.log("AppwriteService.createUser ::" + error);
    }
  }

  async getInterestsLists() {
    try {
      return await this.db.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_INTERESTS_COLLECTION_ID,
        [Query.orderAsc("category")]
      );
    } catch (error) {
      console.log("AppwriteService.createUser ::" + error);
    }
  }

  async getLifestylesLists() {
    try {
      return await this.db.listDocuments(
        APPWRITE_DATABASE_ID,
        APPWRITE_LIFESTYLES_COLLECTION_ID,
        [Query.orderAsc("category")]
      );
    } catch (error) {
      console.log("AppwriteService.createUser ::" + error);
    }
  }

  async updateUser(userId: string, data: any) {
    try {
      return await this.db.updateDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_USER_COLLECTION_ID,
        userId,
        data
      );
    } catch (error) {
      console.log("AppwriteService.updateUser ::" + error);
    }
  }

  async getUser(userId: string) {
    try {
      return await this.db.getDocument(
        APPWRITE_DATABASE_ID,
        APPWRITE_USER_COLLECTION_ID,
        userId
      );
    } catch (error) {
      console.log("AppwriteService.getUser ::" + error);
    }
  }

  // Storage

  async uploadImage(image: string) {
    let filename = image.split("/").pop() as string;

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(image);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("fileId", "unique()");
    formData.append("file", {
      uri: image,
      name: filename,
      type,
    });

    console.log("FORM DATA :", formData);
    return fetch(
      `${APPWRITE_ENDPOINT}/storage/buckets/${APPWRITE_BUCKET_ID}/files/`,
      {
        method: "POST",
        headers: {
          "content-type": "multipart/form-data",
          "X-Appwrite-Project": APPWRITE_PROJECT_ID,
          "x-sdk-version": "appwrite:web:11.0.0",
          "X-Appwrite-Response-Format": "0.15.0",
        },
        body: formData,
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        let imageURL = `https://cloud.appwrite.io/v1/storage/buckets/${result.bucketId}/files/${result.$id}/view?project=${APPWRITE_PROJECT_ID}&mode=admin`;
        console.log("API RESPONSE", JSON.stringify(result));
        return imageURL;
      })
      .catch((error) => {
        console.log("API ERROR", error);
        return "error";
      });
  }
}

export const appwrite = new AppwriteService();

export default AppwriteService;
