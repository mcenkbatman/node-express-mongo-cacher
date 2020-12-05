import mongoose from 'mongoose';
//TODO use different mongodb connections instead of default connection if project goes larger and incldues multiple mongo dbs

const { Schema } = mongoose;
const { Types } = Schema;

const CacheSchema = new Schema({
  key: { type: Types.String, unique: true },
  data: { type: Types.String },
  ttlDurationAsSeconds: { type: Types.Number },
  timeToExpire: { type: Date },
}, { timestamps: true });

CacheSchema.index({ key: 1, timeToExpire: -1 });

const Cache = mongoose.model('Cache', CacheSchema);

export default Cache;