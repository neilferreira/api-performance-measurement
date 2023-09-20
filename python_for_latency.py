import time
import sys
import requests


def perform_apigw_call(session):
    response = session.post(
        url=f"{sys.argv[1]}/foo",
    )
    print(response.status_code, response.text)
    response.raise_for_status()


overall_test_duration = 0
session = requests.Session()

#
# Trigger one "prewarm" of the Lambda function
print("Lambda pre-warm:")
perform_apigw_call(session)

#
# We know authorization works, now lets do a performance test on the API
for x in range(5):
    start = time.time()
    perform_apigw_call(session)
    end = time.time()

    duration = end - start
    print(f"\tThat took {duration}s")
    overall_test_duration = overall_test_duration + duration

print(f"Completed... that took {overall_test_duration}s\n\n")
