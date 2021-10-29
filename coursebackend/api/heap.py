class Heap:
    def __init__(self, heap=[]):
        self.heap = heap

    def add(self, data):
        return self.heap.append(data)

    def remove(self, data):
        return self.heap.remove(data)

    def size(self):
        return len(self.heap)

    def heapify(self, n, i, t):
        s = i
        l = 2 * i + 1
        r = 2 * i + 2

        if self.heap[s][t] is not None and l < n and (self.heap[l][t] is None or self.heap[s][t] > self.heap[l][t]):
            s = l
        if self.heap[s][t] is not None and r < n and (self.heap[r][t] is None or self.heap[s][t] > self.heap[r][t]):
            s = r
        if s != i:
            self.heap[i], self.heap[s] = self.heap[s], self.heap[i]
            self.heapify(n, s, t)

    def heap_sort(self, t="title"):
        n = self.size()
        if t == "alpha":
            t = "title"
        elif t == "rating":
            t = "avg_rating"

        for i in range(n // 2 - 1, -1, -1):
            self.heapify(n, i, t)

        for i in range(n - 1, 0, -1):
            self.heap[i], self.heap[0] = self.heap[0], self.heap[i]
            self.heapify(i, 0, t)
        if t == "title":
            self.flip()

    def flip(self):
        self.heap.reverse()
