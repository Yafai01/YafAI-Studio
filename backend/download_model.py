from transformers import AutoTokenizer, AutoModelForCausalLM

MODEL_NAME = "deepseek-ai/deepseek-coder-1.3b-instruct"

print("Downloading tokenizer...")
AutoTokenizer.from_pretrained(MODEL_NAME)

print("Downloading model (this will take time)...")
AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    device_map=None
)

print("Download complete.")
