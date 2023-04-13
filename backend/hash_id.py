# Function to convert string to hash
import hashlib

# user ID would follow different format than products IDs

def sha256_hash(string):
    return hashlib.sha256(string.encode()).hexdigest()

# print(sha256_hash("Hello World")) --> a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e