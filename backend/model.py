from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import os

# ---- safety + performance ----
torch.set_grad_enabled(False)
os.environ["TOKENIZERS_PARALLELISM"] = "false"

# ⚠️ USE THE SAME MODEL YOU DOWNLOADED
MODEL_NAME = "deepseek-ai/deepseek-coder-1.3b-instruct"

# ---- load tokenizer ----
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

# ---- load model (USE SAFETENSORS, NO REDOWNLOAD) ----
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    torch_dtype=torch.float32,
    device_map=None,
    use_safetensors=True
).to("cpu")

def generate_code(prompt: str, max_tokens: int = 128):
    formatted_prompt = f"""
### Task:
{prompt}

### Code:
"""

    inputs = tokenizer(formatted_prompt, return_tensors="pt")

    outputs = model.generate(
        **inputs,
        max_new_tokens=max_tokens,
        temperature=0.2,
        top_p=0.95,
        do_sample=True
    )

    return tokenizer.decode(outputs[0], skip_special_tokens=True)
