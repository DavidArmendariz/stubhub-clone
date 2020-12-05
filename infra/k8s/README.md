# k8s

## Secrets

To create a secret:

```zsh
kubectl create secret generic jwt-secret --from-literal=<key>=<value>
```

To get secrets:

```zsh
kubectl get secrets
```
