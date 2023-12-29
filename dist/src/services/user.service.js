var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import localforage from 'localforage';
import { genUUID } from '../utils/helpers';
const ID_DB = '__wb-userId';
class UserService {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield this.getId();
            console.warn('UserID: ', id);
        });
    }
    getId() {
        return __awaiter(this, void 0, void 0, function* () {
            let id = yield localforage.getItem(ID_DB);
            if (!id)
                id = yield this._setId();
            return id;
        });
    }
    _setId() {
        return __awaiter(this, void 0, void 0, function* () {
            const id = genUUID();
            yield localforage.setItem(ID_DB, id);
            return id;
        });
    }
}
export const userService = new UserService();
